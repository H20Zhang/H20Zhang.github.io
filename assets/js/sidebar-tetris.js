(function () {
  "use strict";

  var DESKTOP_MQ = "(min-width: 992px)";
  var SIZE = 252;

  // Tetris grid: 14 cols x 14 rows @ 18px = 252 x 252
  var T_COLS = 14;
  var T_ROWS = 14;
  var T_CELL = 18;

  // Snake grid: 21 cols x 21 rows @ 12px = 252 x 252
  var S_COLS = 21;
  var S_ROWS = 21;
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
    return window.matchMedia
      ? window.matchMedia(DESKTOP_MQ).matches
      : window.innerWidth >= 992;
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
    var hintEl = document.getElementById("sidebar-arcade-hint");
    var resetBtn = document.getElementById("sidebar-tetris-reset");
    var tabBtns = root
      ? Array.prototype.slice.call(root.querySelectorAll("[data-arcade-game]"))
      : [];
    if (!root || !canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(SIZE * dpr);
    canvas.height = Math.round(SIZE * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var savedGame = null;
    try {
      savedGame = window.sessionStorage.getItem("hao-sidebar-game");
    } catch (_) {}
    var activeGame =
      savedGame === "snake" || savedGame === "neural" ? savedGame : "tetris";
    var manualUntil = 0;
    var flashUntil = 0;
    var rafId = null;
    var lastFrameTs = performance.now();
    var stepAccumMs = 0;

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
    // 1. TETRIS ENGINE + SELF-PLAYING PLANNER (14 x 14)
    // =========================================================================
    var tState = {
      board: [],
      bag: [],
      current: null,
      plan: null,
      score: 0,
      lines: 0,
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
        var seen = false;
        for (var row = 0; row < T_ROWS; row++) {
          if (b[row][col]) {
            if (!seen) {
              colH = T_ROWS - row;
              seen = true;
            }
          } else if (seen) {
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
      return fullLines * 50 - holes * 15 - aggHeight * 1.4 - bumpiness * 2.1;
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
          var val = evaluateTetrisBoard(sim) + (Math.random() - 0.5) * 3.0;
          candidates.push({ rotSteps: rot, targetX: x, score: val });
        }
        rotMat = rotateMatrixCW(rotMat);
      }
      if (!candidates.length) return { rotSteps: 0, targetX: piece.x };
      candidates.sort(function (a, b) {
        return b.score - a.score;
      });
      var idx =
        Math.random() < 0.85
          ? 0
          : Math.min(candidates.length - 1, 1 + Math.floor(Math.random() * 2));
      return {
        rotSteps: candidates[idx].rotSteps,
        targetX: candidates[idx].targetX,
      };
    }

    function tSpawn(initialY) {
      var type = tNextType();
      var mat = cloneMatrix(SHAPES[type]);
      var initRot = Math.floor(Math.random() * 4);
      for (var i = 0; i < initRot; i++) mat = rotateMatrixCW(mat);
      var maxX = Math.max(0, T_COLS - mat[0].length);
      var rx = Math.floor(Math.random() * (maxX + 1));
      var sy = typeof initialY === "number" ? initialY : 0;

      tState.current = { type: type, matrix: mat, x: rx, y: sy };
      if (tCollides(tState.board, mat, rx, sy)) {
        var cx = Math.floor((T_COLS - mat[0].length) / 2);
        if (!tCollides(tState.board, mat, cx, 0)) {
          tState.current.x = cx;
          tState.current.y = 0;
        } else {
          flashUntil = Date.now() + 360;
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
      tState.clearFlashUntil = 0;
      var r1 = [];
      var r2 = [];
      for (var c = 0; c < T_COLS; c++) {
        var v2 = Math.random() > 0.24 ? 1 + Math.floor(Math.random() * 7) : 0;
        var v1 = v2 && Math.random() > 0.45 ? 1 + Math.floor(Math.random() * 7) : 0;
        r2.push(v2);
        r1.push(v1);
      }
      for (var h = 0; h < 3; h++) {
        var hc = Math.floor(Math.random() * T_COLS);
        r2[hc] = 0;
        r1[hc] = 0;
      }
      tState.board[T_ROWS - 1] = r2;
      tState.board[T_ROWS - 2] = r1;
      tSpawn(1);
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
        if (full) cleared++;
        else kept.push(tState.board[row]);
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
        tState.clearFlashUntil = Date.now() + 160;
      }
      tSpawn(0);
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
    // 2. SNAKE ENGINE + SELF-PLAYING BFS HUNTER (21 x 21)
    // =========================================================================
    var sState = {
      snake: [],
      dir: { x: 1, y: 0 },
      queue: [],
      food: { x: 14, y: 10 },
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
      var startX = 6 + Math.floor(Math.random() * 8);
      var startY = 5 + Math.floor(Math.random() * 11);
      sState.snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY },
        { x: startX - 3, y: startY },
        { x: startX - 4, y: startY },
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
          if (!node.first && d.x === -sState.dir.x && d.y === -sState.dir.y) {
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
        var tx = head.x + bfsDir.x;
        var ty = head.y + bfsDir.y;
        if (
          sCountReachable(tx, ty, sState.snake.length + 8) >=
          sState.snake.length
        ) {
          return bfsDir;
        }
      }

      var best = null;
      var bestSpace = -1;
      for (var j = 0; j < 4; j++) {
        var cand = dirs[j];
        if (cand.x === -sState.dir.x && cand.y === -sState.dir.y) continue;
        var cx = head.x + cand.x;
        var cy = head.y + cand.y;
        if (cx < 0 || cx >= S_COLS || cy < 0 || cy >= S_ROWS) continue;
        if (sOccupied(cx, cy, true)) continue;
        var space = sCountReachable(cx, cy, 100);
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
        if (sState.queue.length) sState.dir = sState.queue.shift();
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
        flashUntil = Date.now() + 340;
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
    // 3. NEURAL NETWORK FORWARD & BACKPROPAGATION ENGINE ([4, 6, 6, 3])
    // =========================================================================
    var NN_LAYERS = [4, 6, 6, 3];
    var nnState = {
      weights: [],
      biases: [],
      acts: [],
      deltas: [],
      grads: [],
      target: [1, 0, 1],
      loss: 0.45,
      lossHistory: [],
      stepCount: 0,
      phase: "forward", // "forward" | "backward"
      progress: 0, // 0 .. 3 across the 3 layer transitions
      nodes: [],
    };

    function sigmoid(z) {
      return 1 / (1 + Math.exp(-Math.max(-8, Math.min(8, z))));
    }

    function nnBuildCoords() {
      var xs = [26, 94, 162, 226];
      var topY = 38;
      var botY = 204;
      nnState.nodes = [];
      for (var l = 0; l < NN_LAYERS.length; l++) {
        var n = NN_LAYERS[l];
        var col = [];
        var span = botY - topY;
        var pad = n === 3 ? 28 : n === 4 ? 18 : 4;
        var usable = span - pad * 2;
        for (var i = 0; i < n; i++) {
          var y =
            n === 1 ? (topY + botY) / 2 : topY + pad + (usable * i) / (n - 1);
          col.push({ x: xs[l], y: y });
        }
        nnState.nodes.push(col);
      }
    }

    function nnSampleTask() {
      var x0 = [];
      for (var i = 0; i < NN_LAYERS[0]; i++) {
        x0.push(+(0.15 + Math.random() * 0.85).toFixed(2));
      }
      nnState.acts[0] = x0;
      var t = [0, 0, 0];
      var hot = Math.floor(Math.random() * 3);
      t[hot] = 1;
      if (Math.random() < 0.4) t[(hot + 1) % 3] = 1;
      nnState.target = t;
    }

    function nnComputeForwardAndGrads() {
      var a = nnState.acts;
      for (var l = 0; l < NN_LAYERS.length - 1; l++) {
        var next = [];
        for (var j = 0; j < NN_LAYERS[l + 1]; j++) {
          var sum = nnState.biases[l][j];
          for (var i = 0; i < NN_LAYERS[l]; i++) {
            sum += nnState.weights[l][j][i] * a[l][i];
          }
          next.push(sigmoid(sum));
        }
        a[l + 1] = next;
      }

      var out = a[NN_LAYERS.length - 1];
      var loss = 0;
      var dOut = [];
      for (var k = 0; k < out.length; k++) {
        var err = out[k] - nnState.target[k];
        loss += 0.5 * err * err;
        dOut.push(err * out[k] * (1 - out[k]));
      }
      nnState.loss = loss;

      nnState.deltas = new Array(NN_LAYERS.length);
      nnState.deltas[NN_LAYERS.length - 1] = dOut;
      for (var bl = NN_LAYERS.length - 2; bl >= 1; bl--) {
        var dLayer = [];
        for (var bi = 0; bi < NN_LAYERS[bl]; bi++) {
          var backSum = 0;
          for (var bj = 0; bj < NN_LAYERS[bl + 1]; bj++) {
            backSum +=
              nnState.weights[bl][bj][bi] * nnState.deltas[bl + 1][bj];
          }
          var actVal = a[bl][bi];
          dLayer.push(backSum * actVal * (1 - actVal));
        }
        nnState.deltas[bl] = dLayer;
      }
      nnState.deltas[0] = a[0].map(function () {
        return 0;
      });

      nnState.grads = [];
      for (var gl = 0; gl < NN_LAYERS.length - 1; gl++) {
        var gMat = [];
        for (var gj = 0; gj < NN_LAYERS[gl + 1]; gj++) {
          var gRow = [];
          for (var gi = 0; gi < NN_LAYERS[gl]; gi++) {
            gRow.push(nnState.deltas[gl + 1][gj] * a[gl][gi]);
          }
          gMat.push(gRow);
        }
        nnState.grads.push(gMat);
      }
    }

    function nnApplyStep() {
      var lr = 1.65;
      for (var l = 0; l < NN_LAYERS.length - 1; l++) {
        for (var j = 0; j < NN_LAYERS[l + 1]; j++) {
          nnState.biases[l][j] -= lr * nnState.deltas[l + 1][j];
          for (var i = 0; i < NN_LAYERS[l]; i++) {
            nnState.weights[l][j][i] -= lr * nnState.grads[l][j][i];
          }
        }
      }
      nnState.stepCount += 1;
      nnComputeForwardAndGrads();
      nnState.lossHistory.push(nnState.loss);
      if (nnState.lossHistory.length > 42) nnState.lossHistory.shift();

      // When converged, sample a new input/target pattern so learning stays lively
      if (nnState.loss < 0.015 || nnState.stepCount % 22 === 0) {
        nnSampleTask();
        nnComputeForwardAndGrads();
      }
      updateHud();
    }

    function nnReset() {
      nnBuildCoords();
      nnState.weights = [];
      nnState.biases = [];
      nnState.acts = new Array(NN_LAYERS.length);
      for (var l = 0; l < NN_LAYERS.length - 1; l++) {
        var wMat = [];
        var bVec = [];
        for (var j = 0; j < NN_LAYERS[l + 1]; j++) {
          var row = [];
          for (var i = 0; i < NN_LAYERS[l]; i++) {
            row.push((Math.random() - 0.5) * 2.2);
          }
          wMat.push(row);
          bVec.push((Math.random() - 0.5) * 0.5);
        }
        nnState.weights.push(wMat);
        nnState.biases.push(bVec);
      }
      nnState.stepCount = 1;
      nnState.lossHistory = [];
      nnState.phase = "forward";
      nnState.progress = 0.35;
      nnSampleTask();
      nnComputeForwardAndGrads();
      nnState.lossHistory.push(nnState.loss);
      updateHud();
    }

    function nnAdvance(dtMs) {
      var numTransitions = NN_LAYERS.length - 1; // 3 transitions
      var speed = 0.0021; // ~1.43s per full forward or backward sweep
      nnState.progress += dtMs * speed;
      if (nnState.progress >= numTransitions + 0.25) {
        if (nnState.phase === "forward") {
          nnState.phase = "backward";
          nnState.progress = 0;
        } else {
          nnApplyStep();
          nnState.phase = "forward";
          nnState.progress = 0;
        }
      }
    }

    // =========================================================================
    // RENDERING
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

      var baseAlpha = isManual() ? 0.96 : 0.88;
      for (var r = 0; r < T_ROWS; r++) {
        for (var c = 0; c < T_COLS; c++) {
          var t = tState.board[r][c];
          if (t) {
            drawTile(
              c * T_CELL,
              r * T_CELL,
              T_CELL,
              1.2,
              2.5,
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
            ? "rgba(255, 133, 89, 0.38)"
            : "rgba(217, 78, 31, 0.30)";
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
              2.5,
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
        ctx.fillRect(0, 0, SIZE, SIZE);
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

      var fx = sState.food.x * S_CELL;
      var fy = sState.food.y * S_CELL;
      ctx.save();
      ctx.fillStyle = dark
        ? "rgba(255, 133, 89, 0.22)"
        : "rgba(217, 78, 31, 0.18)";
      ctx.beginPath();
      ctx.arc(fx + S_CELL / 2, fy + S_CELL / 2, S_CELL * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = dark ? "#ff8559" : "#d94e1f";
      ctx.beginPath();
      ctx.arc(fx + S_CELL / 2, fy + S_CELL / 2, S_CELL * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

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
          alpha = Math.max(0.48, 0.88 - (i / Math.max(len, 14)) * 0.35);
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

    function drawNeural(dark) {
      var fwdColor = dark ? "#ff8559" : "#d94e1f";
      var bwdColor = dark ? "#5cc8e6" : "#1d6f8a";
      var textMuted = dark ? "rgba(244,244,246,0.58)" : "rgba(24,24,27,0.55)";
      var isFwd = nnState.phase === "forward";
      var numTransitions = NN_LAYERS.length - 1;

      // 1. Header bar inside canvas: phase direction + live MSE loss
      ctx.save();
      ctx.font = "600 9.5px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = isFwd ? fwdColor : bwdColor;
      ctx.textAlign = "left";
      ctx.fillText(
        isFwd ? "FORWARD  x → ŷ" : "BACKPROP  ∇W ← ∂L",
        12,
        17
      );
      ctx.fillStyle = textMuted;
      ctx.font = "500 9.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.fillText("L=" + nnState.loss.toFixed(3), SIZE - 12, 17);
      ctx.restore();

      // 2. Synaptic edges + travelling signal pulses
      for (var l = 0; l < numTransitions; l++) {
        // Active transition index: 0->1->2 for forward, 2->1->0 for backward
        var stageOrder = isFwd ? l : numTransitions - 1 - l;
        var localT = nnState.progress - stageOrder;
        var edgeActive = localT >= 0 && localT <= 1;

        for (var j = 0; j < NN_LAYERS[l + 1]; j++) {
          var p2 = nnState.nodes[l + 1][j];
          for (var i = 0; i < NN_LAYERS[l]; i++) {
            var p1 = nnState.nodes[l][i];
            var w = nnState.weights[l][j][i];
            var absW = Math.min(Math.abs(w), 2.5);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = 0.45 + absW * 0.42;

            if (edgeActive) {
              ctx.strokeStyle = isFwd
                ? dark
                  ? "rgba(255, 133, 89, 0.30)"
                  : "rgba(217, 78, 31, 0.24)"
                : dark
                  ? "rgba(92, 200, 230, 0.32)"
                  : "rgba(29, 111, 138, 0.25)";
            } else {
              ctx.strokeStyle = dark
                ? "rgba(255, 255, 255, 0.085)"
                : "rgba(24, 24, 27, 0.085)";
            }
            ctx.stroke();

            // Draw travelling signal particle along active layer transition
            if (edgeActive) {
              var strength = isFwd
                ? Math.abs(nnState.acts[l][i] * w)
                : Math.abs(nnState.grads[l][j][i]) * 6.5;
              if (strength > 0.14) {
                var frac = isFwd ? localT : 1 - localT;
                var sx = p1.x + (p2.x - p1.x) * frac;
                var sy = p1.y + (p2.y - p1.y) * frac;
                var pr = Math.min(2.7, 1.1 + strength * 0.75);
                ctx.save();
                ctx.fillStyle = isFwd ? fwdColor : bwdColor;
                ctx.globalAlpha = Math.min(0.95, 0.35 + strength * 0.45);
                ctx.beginPath();
                ctx.arc(sx, sy, pr, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }
            }
          }
        }
      }

      // 3. Neurons (activation fill + gradient halo + output target rings)
      for (var nl = 0; nl < NN_LAYERS.length; nl++) {
        for (var ni = 0; ni < NN_LAYERS[nl]; ni++) {
          var pt = nnState.nodes[nl][ni];
          var act = nnState.acts[nl] ? nnState.acts[nl][ni] : 0.5;
          var gradMag = nnState.deltas[nl]
            ? Math.min(1, Math.abs(nnState.deltas[nl][ni]) * 5.0)
            : 0;
          var rad = nl === 0 || nl === NN_LAYERS.length - 1 ? 6.2 : 5.4;

          // Target ring on output layer
          if (nl === NN_LAYERS.length - 1) {
            var tgt = nnState.target[ni];
            ctx.save();
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, rad + 3.2, 0, Math.PI * 2);
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = tgt > 0.5
              ? fwdColor
              : dark
                ? "rgba(255,255,255,0.18)"
                : "rgba(24,24,27,0.18)";
            ctx.setLineDash(tgt > 0.5 ? [] : [2, 2]);
            ctx.stroke();
            ctx.restore();
          }

          // Backprop gradient outer halo when backward wave reaches this layer
          if (!isFwd && gradMag > 0.05) {
            var bStage = numTransitions - nl;
            if (nnState.progress >= bStage - 0.3) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, rad + 2.8, 0, Math.PI * 2);
              ctx.fillStyle = bwdColor;
              ctx.globalAlpha = Math.min(0.38, gradMag * 0.42);
              ctx.fill();
              ctx.restore();
            }
          }

          // Neuron body
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = dark ? "#1d1d21" : "#ffffff";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rad - 0.8, 0, Math.PI * 2);
          ctx.fillStyle = fwdColor;
          ctx.globalAlpha = 0.12 + act * 0.82;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
          ctx.lineWidth = 1.15;
          ctx.strokeStyle =
            !isFwd && gradMag > 0.12
              ? bwdColor
              : dark
                ? "rgba(255,255,255,0.34)"
                : "rgba(24,24,27,0.28)";
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. Bottom live loss sparkline strip
      var hist = nnState.lossHistory;
      var sx0 = 12;
      var sx1 = SIZE - 12;
      var syTop = 222;
      var syBot = 242;
      ctx.save();
      ctx.strokeStyle = dark
        ? "rgba(255,255,255,0.08)"
        : "rgba(24,24,27,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx0, syBot);
      ctx.lineTo(sx1, syBot);
      ctx.stroke();

      if (hist.length > 1) {
        var maxL = 0.55;
        for (var h = 0; h < hist.length; h++) {
          if (hist[h] > maxL) maxL = hist[h];
        }
        ctx.beginPath();
        for (var p = 0; p < hist.length; p++) {
          var lx = sx0 + ((sx1 - sx0) * p) / 41;
          var ly = syBot - (Math.min(hist[p], maxL) / maxL) * (syBot - syTop);
          if (p === 0) ctx.moveTo(lx, ly);
          else ctx.lineTo(lx, ly);
        }
        ctx.strokeStyle = fwdColor;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw() {
      var dark = isDark();
      ctx.clearRect(0, 0, SIZE, SIZE);
      if (activeGame === "snake") {
        drawSnake(dark);
      } else if (activeGame === "neural") {
        drawNeural(dark);
      } else {
        drawTetris(dark);
      }

      if (Date.now() < flashUntil) {
        ctx.save();
        ctx.fillStyle = dark
          ? "rgba(255, 133, 89, 0.16)"
          : "rgba(217, 78, 31, 0.12)";
        ctx.fillRect(0, 0, SIZE, SIZE);
        ctx.restore();
      }
    }

    function updateHud() {
      if (scoreEl) {
        if (activeGame === "neural") {
          scoreEl.textContent = "ep " + nnState.stepCount;
        } else if (activeGame === "snake") {
          scoreEl.textContent = String(sState.score);
        } else {
          scoreEl.textContent = String(tState.score);
        }
      }
      if (hintEl) {
        if (activeGame === "neural") {
          hintEl.textContent = "FWD → · ← BWD";
        } else {
          hintEl.textContent = (isManual() ? "LIVE" : "AUTO") + " · ← ↑ ↓ →";
        }
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

    function stepIntervalMs() {
      if (activeGame === "snake") {
        return isManual() ? 110 : 125;
      }
      if (isManual()) {
        var lvl = Math.floor(tState.lines / 5);
        return Math.max(160, 480 - lvl * 38);
      }
      return 220;
    }

    // Continuous 60fps animation loop — starts immediately on page load without clicking!
    function frame(now) {
      if (document.hidden || !isDesktop()) {
        rafId = null;
        return;
      }
      var dt = Math.min(80, Math.max(0, now - lastFrameTs));
      lastFrameTs = now;

      if (activeGame === "neural") {
        nnAdvance(dt);
        draw();
      } else {
        stepAccumMs += dt;
        var interval = stepIntervalMs();
        if (stepAccumMs >= interval) {
          stepAccumMs %= interval;
          if (activeGame === "snake") sStep();
          else tStep();
          updateHud();
        }
        draw();
      }

      rafId = window.requestAnimationFrame(frame);
    }

    function ensureRunning() {
      if (!rafId && !document.hidden && isDesktop()) {
        lastFrameTs = performance.now();
        rafId = window.requestAnimationFrame(frame);
      }
    }

    function switchGame(nextGame) {
      if (
        nextGame !== "tetris" &&
        nextGame !== "snake" &&
        nextGame !== "neural"
      ) {
        return;
      }
      activeGame = nextGame;
      stepAccumMs = 0;
      try {
        window.sessionStorage.setItem("hao-sidebar-game", activeGame);
      } catch (_) {}
      releaseManual();
      draw();
      ensureRunning();
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
        else if (activeGame === "neural") nnReset();
        else tReset();
        draw();
        ensureRunning();
      });
    }

    canvas.addEventListener("click", function () {
      if (!isDesktop()) return;
      if (activeGame === "neural") {
        nnSampleTask();
        nnComputeForwardAndGrads();
        nnState.phase = "forward";
        nnState.progress = 0;
        draw();
        return;
      }
      if (isManual()) releaseManual();
      else engageManual();
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
        if (activeGame === "neural") {
          e.preventDefault();
          nnSampleTask();
          nnComputeForwardAndGrads();
          nnState.phase = key === "ArrowLeft" ? "backward" : "forward";
          nnState.progress = 0;
          draw();
          return;
        }
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
            stepAccumMs = 0;
          }
          draw();
        }
        return;
      }

      if (
        isManual() &&
        activeGame === "tetris" &&
        (key === " " || key === "Spacebar")
      ) {
        e.preventDefault();
        engageManual();
        tHardDrop();
        stepAccumMs = 0;
        draw();
        return;
      }

      if (isManual() && key === "Escape") {
        e.preventDefault();
        releaseManual();
        draw();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) ensureRunning();
    });

    window.addEventListener("resize", function () {
      ensureRunning();
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
    nnReset();
    updateHud();
    draw();
    ensureRunning();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSidebarArcade);
  } else {
    initSidebarArcade();
  }
})();
