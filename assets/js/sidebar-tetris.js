(function () {
  "use strict";

  var DESKTOP_MQ = "(min-width: 992px)";
  var CANVAS_W = 180;
  var CANVAS_H = 288;

  // Tetris grid: 10 x 16 @ 18px = 180 x 288
  var T_COLS = 10;
  var T_ROWS = 16;
  var T_CELL = 18;

  // Snake grid: 15 x 24 @ 12px = 180 x 288
  var S_COLS = 15;
  var S_ROWS = 24;
  var S_CELL = 12;

  var MANUAL_IDLE_MS = 9000;

  var SHAPES = [
    null,
    [[1, 1, 1], [0, 1, 0]],
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]],
  ];

  var PALETTE_LIGHT = [
    null,
    "#d94e1f",
    "#b83b14",
    "#df7a38",
    "#8a5a44",
    "#52504c",
    "#c96442",
    "#d99b52",
  ];

  var PALETTE_DARK = [
    null,
    "#ff8559",
    "#e5663a",
    "#f2a365",
    "#b07d62",
    "#8d8b94",
    "#d97c54",
    "#f0b67f",
  ];

  function isDesktop() {
    return (
      window.matchMedia &&
      window.matchMedia(DESKTOP_MQ).matches &&
      window.innerHeight >= 560
    );
  }

  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function isEditableTarget(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.isContentEditable) return true;
    if (tag === "ninja-keys") return true;
    return false;
  }

  function cloneMatrix(m) {
    return m.map(function (r) {
      return r.slice();
    });
  }

  function rotateMatrixCW(m) {
    var rows = m.length;
    var cols = m[0].length;
    var out = [];
    for (var c = 0; c < cols; c++) {
      var row = [];
      for (var r = rows - 1; r >= 0; r--) row.push(m[r][c]);
      out.push(row);
    }
    return out;
  }

  function initSidebarArcade() {
    var root = document.getElementById("sidebar-tetris");
    var canvas = document.getElementById("sidebar-tetris-canvas");
    var scoreEl = document.getElementById("sidebar-tetris-score");
    var modeBadgeEl = document.getElementById("sidebar-arcade-mode");
    var resetBtn = document.getElementById("sidebar-tetris-reset");
    var tabBtns = root
      ? Array.prototype.slice.call(root.querySelectorAll("[data-arcade-game]"))
      : [];
    if (!root || !canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(CANVAS_W * dpr);
    canvas.height = Math.round(CANVAS_H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var savedGame = null;
    try {
      savedGame = window.sessionStorage.getItem("hao-sidebar-game");
    } catch (_) {}
    var activeGame = savedGame === "snake" ? "snake" : "tetris";
    var manualUntil = 0;
    var timerId = null;
    var flashUntil = 0;

    function isManual() {
      return Date.now() < manualUntil;
    }

    function engageManual() {
      manualUntil = Date.now() + MANUAL_IDLE_MS;
      root.classList.add("is-playing");
      updateHud();
    }

    function releaseManual() {
      manualUntil = 0;
      root.classList.remove("is-playing");
      if (activeGame === "tetris" && tState.current) {
        tState.plan = planTetrisMove(tState.board, tState.current);
      }
      updateHud();
    }

    // =========================================================================
    // TETRIS ENGINE + SELF-PLAYING PLANNER
    // =========================================================================
    var tState = {
      board: [],
      bag: [],
      current: null,
      plan: null,
      score: 0,
      lines: 0,
      clearingRows: [],
      clearFlashUntil: 0,
    };

    function tEmptyBoard() {
      var g = [];
      for (var r = 0; r < T_ROWS; r++) {
        var row = [];
        for (var c = 0; c < T_COLS; c++) row.push(0);
        g.push(row);
      }
      return g;
    }

    function tRefillBag() {
      var next = [1, 2, 3, 4, 5, 6, 7];
      for (var i = next.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = next[i];
        next[i] = next[j];
        next[j] = tmp;
      }
      tState.bag = tState.bag.concat(next);
    }

    function tNextType() {
      if (tState.bag.length < 2) tRefillBag();
      return tState.bag.shift();
    }

    function tCollides(board, matrix, px, py) {
      for (var r = 0; r < matrix.length; r++) {
        for (var c = 0; c < matrix[r].length; c++) {
          if (!matrix[r][c]) continue;
          var nx = px + c;
          var ny = py + r;
          if (nx < 0 || nx >= T_COLS || ny >= T_ROWS) return true;
          if (ny >= 0 && board[ny][nx]) return true;
        }
      }
      return false;
    }

    function evaluateTetrisBoard(b) {
      var fullLines = 0;
      for (var r = 0; r < T_ROWS; r++) {
        var full = true;
        for (var c = 0; c < T_COLS; c++) {
          if (!b[r][c]) {
            full = false;
            break;
          }
        }
        if (full) fullLines++;
      }

      var heights = [];
      var holes = 0;
      var aggHeight = 0;
      for (var col = 0; col < T_COLS; col++) {
        var colH = 0;
        var seenBlock = false;
        for (var row = 0; row < T_ROWS; row++) {
          if (b[row][col]) {
            if (!seenBlock) {
              colH = T_ROWS - row;
              seenBlock = true;
            }
          } else if (seenBlock) {
            holes++;
          }
        }
        heights.push(colH);
        aggHeight += colH;
      }

      var bumpiness = 0;
      for (var k = 0; k < T_COLS - 1; k++) {
        bumpiness += Math.abs(heights[k] - heights[k + 1]);
      }

      return (
        fullLines * 46 -
        holes * 15 -
        aggHeight * 1.45 -
        bumpiness * 2.2
      );
    }

    function planTetrisMove(board, piece) {
      var candidates = [];
      var rotMat = cloneMatrix(piece.matrix);
      for (var rot = 0; rot < 4; rot++) {
        var maxX = T_COLS - rotMat[0].length;
        for (var x = 0; x <= maxX; x++) {
          if (tCollides(board, rotMat, x, piece.y)) continue;
          var dropY = piece.y;
          while (!tCollides(board, rotMat, x, dropY + 1)) dropY++;
          var sim = cloneMatrix(board);
          for (var r = 0; r < rotMat.length; r++) {
            for (var c = 0; c < rotMat[r].length; c++) {
              if (rotMat[r][c] && dropY + r >= 0 && dropY + r < T_ROWS) {
                sim[dropY + r][x + c] = piece.type;
              }
            }
          }
          var val = evaluateTetrisBoard(sim) + (Math.random() - 0.5) * 3.2;
          candidates.push({ rotSteps: rot, targetX: x, score: val });
        }
        rotMat = rotateMatrixCW(rotMat);
      }
      if (!candidates.length) return { rotSteps: 0, targetX: piece.x };
      candidates.sort(function (a, b) {
        return b.score - a.score;
      });
      // Mostly pick best placement so it clears lines cleanly, with occasional playful variety
      var idx =
        Math.random() < 0.84
          ? 0
          : Math.min(candidates.length - 1, 1 + Math.floor(Math.random() * 2));
      return {
        rotSteps: candidates[idx].rotSteps,
        targetX: candidates[idx].targetX,
      };
    }

    function tSpawn() {
      var type = tNextType();
      var mat = cloneMatrix(SHAPES[type]);
      // Random initial rotation and random horizontal spawn position
      var initRot = Math.floor(Math.random() * 4);
      for (var i = 0; i < initRot; i++) mat = rotateMatrixCW(mat);
      var maxX = Math.max(0, T_COLS - mat[0].length);
      var rx = Math.floor(Math.random() * (maxX + 1));

      tState.current = { type: type, matrix: mat, x: rx, y: 0 };
      if (tCollides(tState.board, mat, rx, 0)) {
        // Try center fallback before declaring top-out
        var cx = Math.floor((T_COLS - mat[0].length) / 2);
        if (!tCollides(tState.board, mat, cx, 0)) {
          tState.current.x = cx;
        } else {
          // Topped out -> brief flash & auto-restart!
          flashUntil = Date.now() + 380;
          tReset();
          return;
        }
      }
      tState.plan = planTetrisMove(tState.board, tState.current);
    }

    function tReset() {
      tState.board = tEmptyBoard();
      tState.bag = [];
      tState.score = 0;
      tState.lines = 0;
      tState.clearingRows = [];
      tState.clearFlashUntil = 0;
      // Seed 2 subtle partial rows so the board immediately looks lively
      var r1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var r2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var holes1 = 2 + Math.floor(Math.random() * 2);
      for (var c = 0; c < T_COLS; c++) {
        if (Math.random() > 0.25) r2[c] = 1 + Math.floor(Math.random() * 7);
        if (Math.random() > 0.48 && r2[c]) r1[c] = 1 + Math.floor(Math.random() * 7);
      }
      // Guarantee at least 2 open gaps in bottom row so it isn't pre-full
      for (var h = 0; h < holes1; h++) {
        var hc = Math.floor(Math.random() * T_COLS);
        r2[hc] = 0;
        r1[hc] = 0;
      }
      tState.board[T_ROWS - 1] = r2;
      tState.board[T_ROWS - 2] = r1;
      tSpawn();
      updateHud();
    }

    function tRotate() {
      var cur = tState.current;
      if (!cur) return false;
      var rotated = rotateMatrixCW(cur.matrix);
      var kicks = [0, -1, 1, -2, 2];
      for (var i = 0; i < kicks.length; i++) {
        var nx = cur.x + kicks[i];
        if (!tCollides(tState.board, rotated, nx, cur.y)) {
          cur.matrix = rotated;
          cur.x = nx;
          return true;
        }
      }
      return false;
    }

    function tMove(dx) {
      var cur = tState.current;
      if (!cur) return false;
      if (!tCollides(tState.board, cur.matrix, cur.x + dx, cur.y)) {
        cur.x += dx;
        return true;
      }
      return false;
    }

    function tLock() {
      var cur = tState.current;
      if (!cur) return;
      for (var r = 0; r < cur.matrix.length; r++) {
        for (var c = 0; c < cur.matrix[r].length; c++) {
          if (!cur.matrix[r][c]) continue;
          var by = cur.y + r;
          var bx = cur.x + c;
          if (by >= 0 && by < T_ROWS && bx >= 0 && bx < T_COLS) {
            tState.board[by][bx] = cur.type;
          }
        }
      }

      var kept = [];
      var cleared = 0;
      for (var row = 0; row < T_ROWS; row++) {
        var full = true;
        for (var col = 0; col < T_COLS; col++) {
          if (!tState.board[row][col]) {
            full = false;
            break;
          }
        }
        if (full) {
          cleared++;
        } else {
          kept.push(tState.board[row]);
        }
      }

      if (cleared > 0) {
        for (var f = 0; f < cleared; f++) {
          var empty = [];
          for (var k = 0; k < T_COLS; k++) empty.push(0);
          kept.unshift(empty);
        }
        tState.board = kept;
        var pts = [0, 100, 300, 500, 800];
        tState.score += pts[cleared] || cleared * 200;
        tState.lines += cleared;
        tState.clearFlashUntil = Date.now() + 150;
      }
      tSpawn();
      updateHud();
    }

    function tStep() {
      var cur = tState.current;
      if (!cur) return;

      if (!isManual() && tState.plan) {
        if (tState.plan.rotSteps > 0) {
          if (tRotate()) tState.plan.rotSteps--;
          else tState.plan.rotSteps = 0;
        } else if (cur.x < tState.plan.targetX) {
          tMove(1);
        } else if (cur.x > tState.plan.targetX) {
          tMove(-1);
        }
      }

      if (!tCollides(tState.board, cur.matrix, cur.x, cur.y + 1)) {
        cur.y += 1;
      } else {
        tLock();
      }
    }

    function tHardDrop() {
      var cur = tState.current;
      if (!cur) return;
      var dropped = 0;
      while (!tCollides(tState.board, cur.matrix, cur.x, cur.y + 1)) {
        cur.y += 1;
        dropped++;
      }
      tState.score += dropped * 2;
      tLock();
    }

    function tGhostY() {
      var cur = tState.current;
      if (!cur) return 0;
      var gy = cur.y;
      while (!tCollides(tState.board, cur.matrix, cur.x, gy + 1)) gy++;
      return gy;
    }

    // =========================================================================
    // SNAKE ENGINE + SELF-PLAYING BFS HUNTER
    // =========================================================================
    var sState = {
      snake: [],
      dir: { x: 1, y: 0 },
      queue: [],
      food: { x: 10, y: 12 },
      score: 0,
    };

    function sOccupied(x, y, ignoreTail) {
      var limit = ignoreTail ? sState.snake.length - 1 : sState.snake.length;
      for (var i = 0; i < limit; i++) {
        if (sState.snake[i].x === x && sState.snake[i].y === y) return true;
      }
      return false;
    }

    function sSpawnFood() {
      var free = [];
      for (var y = 0; y < S_ROWS; y++) {
        for (var x = 0; x < S_COLS; x++) {
          if (!sOccupied(x, y, false)) free.push({ x: x, y: y });
        }
      }
      if (!free.length) {
        sReset();
        return;
      }
      sState.food = free[Math.floor(Math.random() * free.length)];
    }

    function sReset() {
      var startX = 4 + Math.floor(Math.random() * 6);
      var startY = 6 + Math.floor(Math.random() * 12);
      sState.snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY },
        { x: startX - 3, y: startY },
      ];
      sState.dir = { x: 1, y: 0 };
      sState.queue = [];
      sState.score = 0;
      sSpawnFood();
      updateHud();
    }

    function sCountReachable(startX, startY, maxVisit) {
      var visited = {};
      var q = [{ x: startX, y: startY }];
      visited[startX + "," + startY] = true;
      var count = 0;
      var dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];
      while (q.length && count < maxVisit) {
        var cur = q.shift();
        count++;
        for (var i = 0; i < 4; i++) {
          var nx = cur.x + dirs[i].x;
          var ny = cur.y + dirs[i].y;
          var key = nx + "," + ny;
          if (
            nx >= 0 &&
            nx < S_COLS &&
            ny >= 0 &&
            ny < S_ROWS &&
            !visited[key] &&
            !sOccupied(nx, ny, true)
          ) {
            visited[key] = true;
            q.push({ x: nx, y: ny });
          }
        }
      }
      return count;
    }

    function sChooseAutoDir() {
      var head = sState.snake[0];
      var dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ];

      // BFS shortest path to food
      var q = [{ x: head.x, y: head.y, first: null }];
      var seen = {};
      seen[head.x + "," + head.y] = true;
      var bfsDir = null;

      while (q.length) {
        var node = q.shift();
        if (node.x === sState.food.x && node.y === sState.food.y) {
          bfsDir = node.first;
          break;
        }
        for (var i = 0; i < 4; i++) {
          var d = dirs[i];
          // Disallow immediate 180 reversal from head
          if (
            !node.first &&
            d.x === -sState.dir.x &&
            d.y === -sState.dir.y
          ) {
            continue;
          }
          var nx = node.x + d.x;
          var ny = node.y + d.y;
          var k = nx + "," + ny;
          if (
            nx >= 0 &&
            nx < S_COLS &&
            ny >= 0 &&
            ny < S_ROWS &&
            !seen[k] &&
            !sOccupied(nx, ny, true)
          ) {
            seen[k] = true;
            q.push({ x: nx, y: ny, first: node.first || d });
          }
        }
      }

      if (bfsDir) {
        var nextX = head.x + bfsDir.x;
        var nextY = head.y + bfsDir.y;
        // Make sure taking bfsDir leaves enough open space for our body
        if (sCountReachable(nextX, nextY, sState.snake.length + 6) >= sState.snake.length) {
          return bfsDir;
        }
      }

      // Fallback: pick safe neighbor with largest reachable cavity
      var best = null;
      var bestSpace = -1;
      for (var j = 0; j < 4; j++) {
        var cand = dirs[j];
        if (cand.x === -sState.dir.x && cand.y === -sState.dir.y) continue;
        var cx = head.x + cand.x;
        var cy = head.y + cand.y;
        if (cx < 0 || cx >= S_COLS || cy < 0 || cy >= S_ROWS) continue;
        if (sOccupied(cx, cy, true)) continue;
        var space = sCountReachable(cx, cy, 80);
        if (space > bestSpace) {
          bestSpace = space;
          best = cand;
        }
      }
      return best || sState.dir;
    }

    function sQueueDir(dx, dy) {
      var ref = sState.queue.length
        ? sState.queue[sState.queue.length - 1]
        : sState.dir;
      if (dx === -ref.x && dy === -ref.y) return;
      if (dx === ref.x && dy === ref.y) return;
      if (sState.queue.length < 2) {
        sState.queue.push({ x: dx, y: dy });
      }
    }

    function sStep() {
      if (isManual()) {
        if (sState.queue.length) {
          sState.dir = sState.queue.shift();
        }
      } else {
        sState.queue = [];
        sState.dir = sChooseAutoDir();
      }

      var head = sState.snake[0];
      var nx = head.x + sState.dir.x;
      var ny = head.y + sState.dir.y;
      var willEat = nx === sState.food.x && ny === sState.food.y;

      if (
        nx < 0 ||
        nx >= S_COLS ||
        ny < 0 ||
        ny >= S_ROWS ||
        sOccupied(nx, ny, !willEat)
      ) {
        flashUntil = Date.now() + 360;
        sReset();
        return;
      }

      sState.snake.unshift({ x: nx, y: ny });
      if (willEat) {
        sState.score += 10;
        updateHud();
        sSpawnFood();
      } else {
        sState.snake.pop();
      }
    }

    // =========================================================================
    // RENDERING & MAIN LOOP
    // =========================================================================
    function roundRect(x, y, w, h, rad) {
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
      ctx.lineTo(x + w, y + h - rad);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
      ctx.lineTo(x + rad, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
      ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y);
      ctx.closePath();
    }

    function drawTile(x, y, size, pad, radius, color, alpha) {
      ctx.save();
      ctx.globalAlpha = typeof alpha === "number" ? alpha : 1;
      ctx.fillStyle = color;
      roundRect(x + pad, y + pad, size - pad * 2, size - pad * 2, radius);
      ctx.fill();
      ctx.restore();
    }

    function drawTetris(dark) {
      var palette = dark ? PALETTE_DARK : PALETTE_LIGHT;

      ctx.fillStyle = dark
        ? "rgba(255, 255, 255, 0.055)"
        : "rgba(24, 24, 27, 0.06)";
      for (var gr = 0; gr < T_ROWS; gr++) {
        for (var gc = 0; gc < T_COLS; gc++) {
          ctx.fillRect(
            gc * T_CELL + T_CELL / 2 - 0.5,
            gr * T_CELL + T_CELL / 2 - 0.5,
            1,
            1
          );
        }
      }

      var baseAlpha = isManual() ? 0.96 : 0.86;
      for (var r = 0; r < T_ROWS; r++) {
        for (var c = 0; c < T_COLS; c++) {
          var t = tState.board[r][c];
          if (t) {
            drawTile(
              c * T_CELL,
              r * T_CELL,
              T_CELL,
              1.2,
              2.4,
              palette[t],
              baseAlpha
            );
          }
        }
      }

      var cur = tState.current;
      if (cur) {
        var gy = tGhostY();
        if (isManual() && gy > cur.y) {
          ctx.save();
          ctx.strokeStyle = dark
            ? "rgba(255, 133, 89, 0.36)"
            : "rgba(217, 78, 31, 0.28)";
          ctx.lineWidth = 1;
          for (var mr = 0; mr < cur.matrix.length; mr++) {
            for (var mc = 0; mc < cur.matrix[mr].length; mc++) {
              if (!cur.matrix[mr][mc]) continue;
              roundRect(
                (cur.x + mc) * T_CELL + 2,
                (gy + mr) * T_CELL + 2,
                T_CELL - 4,
                T_CELL - 4,
                2
              );
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        for (var pr = 0; pr < cur.matrix.length; pr++) {
          for (var pc = 0; pc < cur.matrix[pr].length; pc++) {
            if (!cur.matrix[pr][pc]) continue;
            var py = cur.y + pr;
            if (py < 0) continue;
            drawTile(
              (cur.x + pc) * T_CELL,
              py * T_CELL,
              T_CELL,
              1.2,
              2.4,
              palette[cur.type],
              0.98
            );
          }
        }
      }

      if (Date.now() < tState.clearFlashUntil) {
        ctx.save();
        ctx.fillStyle = dark
          ? "rgba(255, 133, 89, 0.14)"
          : "rgba(217, 78, 31, 0.10)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.restore();
      }
    }

    function drawSnake(dark) {
      ctx.fillStyle = dark
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(24, 24, 27, 0.055)";
      for (var gr = 0; gr < S_ROWS; gr += 2) {
        for (var gc = 0; gc < S_COLS; gc += 2) {
          ctx.fillRect(
            gc * S_CELL + S_CELL / 2 - 0.5,
            gr * S_CELL + S_CELL / 2 - 0.5,
            1,
            1
          );
        }
      }

      // Food gem with soft outer halo
      var fx = sState.food.x * S_CELL;
      var fy = sState.food.y * S_CELL;
      ctx.save();
      ctx.fillStyle = dark
        ? "rgba(255, 133, 89, 0.22)"
        : "rgba(217, 78, 31, 0.18)";
      ctx.beginPath();
      ctx.arc(fx + S_CELL / 2, fy + S_CELL / 2, S_CELL * 0.58, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = dark ? "#ff8559" : "#d94e1f";
      ctx.beginPath();
      ctx.arc(fx + S_CELL / 2, fy + S_CELL / 2, S_CELL * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Snake segments (head in accent persimmon, body tapering through warm sienna/charcoal)
      var len = sState.snake.length;
      for (var i = len - 1; i >= 0; i--) {
        var seg = sState.snake[i];
        var color;
        var alpha = 0.92;
        if (i === 0) {
          color = dark ? "#ff8559" : "#d94e1f";
          alpha = 1;
        } else if (i < 4) {
          color = dark ? "#d97c54" : "#c96442";
        } else {
          color = dark ? "#8d8b94" : "#5e5b56";
          alpha = Math.max(0.48, 0.88 - (i / Math.max(len, 12)) * 0.35);
        }
        drawTile(
          seg.x * S_CELL,
          seg.y * S_CELL,
          S_CELL,
          1,
          i === 0 ? 3.2 : 2.2,
          color,
          alpha
        );
      }
    }

    function draw() {
      var dark = isDark();
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      if (activeGame === "snake") {
        drawSnake(dark);
      } else {
        drawTetris(dark);
      }

      if (Date.now() < flashUntil) {
        ctx.save();
        ctx.fillStyle = dark
          ? "rgba(255, 133, 89, 0.16)"
          : "rgba(217, 78, 31, 0.12)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.restore();
      }
    }

    function updateHud() {
      var val = activeGame === "snake" ? sState.score : tState.score;
      if (scoreEl) scoreEl.textContent = String(val);
      if (modeBadgeEl) {
        modeBadgeEl.textContent = isManual() ? "LIVE" : "AUTO";
      }
      if (!isManual()) {
        root.classList.remove("is-playing");
      }
      for (var i = 0; i < tabBtns.length; i++) {
        var isSel = tabBtns[i].getAttribute("data-arcade-game") === activeGame;
        tabBtns[i].classList.toggle("is-active", isSel);
        tabBtns[i].setAttribute("aria-selected", isSel ? "true" : "false");
      }
    }

    function currentDelay() {
      if (activeGame === "snake") {
        return isManual() ? 115 : 135;
      }
      if (isManual()) {
        var lvl = Math.floor(tState.lines / 5);
        return Math.max(170, 520 - lvl * 40);
      }
      return 250;
    }

    function scheduleTick() {
      if (timerId) clearTimeout(timerId);
      if (document.hidden || !isDesktop()) {
        timerId = null;
        return;
      }
      timerId = setTimeout(function () {
        if (activeGame === "snake") {
          sStep();
        } else {
          tStep();
        }
        updateHud();
        draw();
        scheduleTick();
      }, currentDelay());
    }

    function switchGame(nextGame) {
      if (nextGame !== "tetris" && nextGame !== "snake") return;
      activeGame = nextGame;
      try {
        window.sessionStorage.setItem("hao-sidebar-game", activeGame);
      } catch (_) {}
      releaseManual();
      draw();
      scheduleTick();
    }

    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener("click", function (e) {
        var g = e.currentTarget.getAttribute("data-arcade-game");
        switchGame(g);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (activeGame === "snake") sReset();
        else tReset();
        draw();
        scheduleTick();
      });
    }

    canvas.addEventListener("click", function () {
      if (!isDesktop()) return;
      if (isManual()) {
        releaseManual();
      } else {
        engageManual();
      }
      draw();
    });

    document.addEventListener("mousedown", function (e) {
      if (!isManual()) return;
      var nav = document.getElementById("navbar");
      if (nav && !nav.contains(e.target)) {
        releaseManual();
        draw();
      }
    });

    window.addEventListener("keydown", function (e) {
      if (!isDesktop() || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      var key = e.key;
      var isArrow =
        key === "ArrowLeft" ||
        key === "ArrowRight" ||
        key === "ArrowUp" ||
        key === "ArrowDown";

      if (isArrow) {
        e.preventDefault();
        engageManual();
        if (activeGame === "snake") {
          if (key === "ArrowLeft") sQueueDir(-1, 0);
          else if (key === "ArrowRight") sQueueDir(1, 0);
          else if (key === "ArrowUp") sQueueDir(0, -1);
          else if (key === "ArrowDown") sQueueDir(0, 1);
          draw();
        } else {
          if (key === "ArrowLeft") tMove(-1);
          else if (key === "ArrowRight") tMove(1);
          else if (key === "ArrowUp") tRotate();
          else if (key === "ArrowDown") {
            if (
              tState.current &&
              !tCollides(
                tState.board,
                tState.current.matrix,
                tState.current.x,
                tState.current.y + 1
              )
            ) {
              tState.current.y += 1;
            } else {
              tLock();
            }
            scheduleTick();
          }
          draw();
        }
        return;
      }

      if (isManual() && activeGame === "tetris" && (key === " " || key === "Spacebar")) {
        e.preventDefault();
        engageManual();
        tHardDrop();
        draw();
        scheduleTick();
        return;
      }

      if (isManual() && key === "Escape") {
        e.preventDefault();
        releaseManual();
        draw();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
      } else if (isDesktop() && !timerId) {
        draw();
        scheduleTick();
      }
    });

    window.addEventListener("resize", function () {
      if (isDesktop() && !timerId) {
        draw();
        scheduleTick();
      } else if (!isDesktop() && timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
    });

    if (window.MutationObserver) {
      var obs = new MutationObserver(function () {
        draw();
      });
      obs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    tReset();
    sReset();
    updateHud();
    draw();
    if (isDesktop()) scheduleTick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSidebarArcade);
  } else {
    initSidebarArcade();
  }
})();
