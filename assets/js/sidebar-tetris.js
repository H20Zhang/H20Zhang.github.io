(function () {
  "use strict";

  var COLS = 10;
  var ROWS = 15;
  var CELL = 12;
  var DESKTOP_MQ = "(min-width: 992px)";

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
    return window.matchMedia && window.matchMedia(DESKTOP_MQ).matches;
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

  function initSidebarTetris() {
    var root = document.getElementById("sidebar-tetris");
    var canvas = document.getElementById("sidebar-tetris-canvas");
    var scoreEl = document.getElementById("sidebar-tetris-score");
    var statusEl = document.getElementById("sidebar-tetris-status");
    var resetBtn = document.getElementById("sidebar-tetris-reset");
    if (!root || !canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    var width = COLS * CELL;
    var height = ROWS * CELL;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var board = [];
    var bag = [];
    var current = null;
    var score = 0;
    var lines = 0;
    var running = false;
    var started = false;
    var gameOver = false;
    var timerId = null;

    function emptyBoard() {
      var grid = [];
      for (var r = 0; r < ROWS; r++) {
        var row = [];
        for (var c = 0; c < COLS; c++) row.push(0);
        grid.push(row);
      }
      return grid;
    }

    function cloneMatrix(m) {
      return m.map(function (row) {
        return row.slice();
      });
    }

    function refillBag() {
      var next = [1, 2, 3, 4, 5, 6, 7];
      for (var i = next.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = next[i];
        next[i] = next[j];
        next[j] = tmp;
      }
      bag = bag.concat(next);
    }

    function nextType() {
      if (bag.length < 2) refillBag();
      return bag.shift();
    }

    function collides(matrix, px, py) {
      for (var r = 0; r < matrix.length; r++) {
        for (var c = 0; c < matrix[r].length; c++) {
          if (!matrix[r][c]) continue;
          var nx = px + c;
          var ny = py + r;
          if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
          if (ny >= 0 && board[ny][nx]) return true;
        }
      }
      return false;
    }

    function spawnPiece(forcedType, forcedY) {
      var type = forcedType || nextType();
      var matrix = cloneMatrix(SHAPES[type]);
      var px = Math.floor((COLS - matrix[0].length) / 2);
      var py = typeof forcedY === "number" ? forcedY : 0;
      current = { type: type, matrix: matrix, x: px, y: py };
      if (collides(current.matrix, current.x, current.y)) {
        gameOver = true;
        stopLoop();
      }
    }

    function seedSculpture() {
      board = emptyBoard();
      bag = [];
      score = 0;
      lines = 0;
      gameOver = false;
      started = false;
      board[ROWS - 3] = [0, 5, 0, 0, 0, 0, 0, 0, 4, 0];
      board[ROWS - 2] = [5, 6, 6, 0, 0, 0, 3, 4, 4, 7];
      board[ROWS - 1] = [5, 5, 6, 2, 0, 3, 3, 2, 7, 7];
      current = {
        type: 1,
        matrix: cloneMatrix(SHAPES[1]),
        x: 3,
        y: 2,
      };
      updateHud();
      draw();
    }

    function resetFreshGame(autoStart) {
      stopLoop();
      board = emptyBoard();
      bag = [];
      score = 0;
      lines = 0;
      gameOver = false;
      started = Boolean(autoStart);
      spawnPiece();
      updateHud();
      if (autoStart && isDesktop()) {
        startLoop();
      } else {
        draw();
      }
    }

    function dropInterval() {
      var step = Math.floor(lines / 5);
      return Math.max(180, 620 - step * 45);
    }

    function startLoop() {
      if (gameOver || !isDesktop()) return;
      running = true;
      started = true;
      root.classList.add("is-playing");
      scheduleTick();
      updateHud();
      draw();
    }

    function stopLoop() {
      running = false;
      root.classList.remove("is-playing");
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      updateHud();
      draw();
    }

    function scheduleTick() {
      if (timerId) clearTimeout(timerId);
      if (!running || gameOver) return;
      timerId = setTimeout(function () {
        stepDown();
        if (running && !gameOver) scheduleTick();
      }, dropInterval());
    }

    function lockPiece() {
      var m = current.matrix;
      for (var r = 0; r < m.length; r++) {
        for (var c = 0; c < m[r].length; c++) {
          if (!m[r][c]) continue;
          var by = current.y + r;
          var bx = current.x + c;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            board[by][bx] = current.type;
          }
        }
      }
      var cleared = 0;
      for (var row = ROWS - 1; row >= 0; row--) {
        var full = true;
        for (var col = 0; col < COLS; col++) {
          if (!board[row][col]) {
            full = false;
            break;
          }
        }
        if (full) {
          board.splice(row, 1);
          var empty = [];
          for (var k = 0; k < COLS; k++) empty.push(0);
          board.unshift(empty);
          cleared++;
          row++;
        }
      }
      if (cleared > 0) {
        var points = [0, 100, 300, 500, 800];
        score += points[cleared] || cleared * 200;
        lines += cleared;
      }
      spawnPiece();
      updateHud();
    }

    function stepDown() {
      if (!current || gameOver) return false;
      if (!collides(current.matrix, current.x, current.y + 1)) {
        current.y += 1;
        draw();
        return true;
      }
      lockPiece();
      draw();
      return false;
    }

    function moveHorizontal(dx) {
      if (!current || gameOver) return;
      if (!collides(current.matrix, current.x + dx, current.y)) {
        current.x += dx;
        draw();
      }
    }

    function rotateCurrent() {
      if (!current || gameOver) return;
      var m = current.matrix;
      var rows = m.length;
      var cols = m[0].length;
      var rotated = [];
      for (var c = 0; c < cols; c++) {
        var newRow = [];
        for (var r = rows - 1; r >= 0; r--) {
          newRow.push(m[r][c]);
        }
        rotated.push(newRow);
      }
      var kicks = [0, -1, 1, -2, 2];
      for (var i = 0; i < kicks.length; i++) {
        var nx = current.x + kicks[i];
        if (!collides(rotated, nx, current.y)) {
          current.matrix = rotated;
          current.x = nx;
          draw();
          return;
        }
      }
    }

    function hardDrop() {
      if (!current || gameOver) return;
      var dropped = 0;
      while (!collides(current.matrix, current.x, current.y + 1)) {
        current.y += 1;
        dropped++;
      }
      score += dropped * 2;
      lockPiece();
      updateHud();
      draw();
      if (running && !gameOver) scheduleTick();
    }

    function ghostY() {
      if (!current) return 0;
      var gy = current.y;
      while (!collides(current.matrix, current.x, gy + 1)) {
        gy += 1;
      }
      return gy;
    }

    function updateHud() {
      if (scoreEl) {
        scoreEl.textContent = String(score);
      }
      if (statusEl) {
        if (gameOver) {
          statusEl.textContent = "OVER";
        } else if (running) {
          statusEl.textContent = "LIVE";
        } else if (started) {
          statusEl.textContent = "PAUSED";
        } else {
          statusEl.textContent = "TETRIS";
        }
      }
    }

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

    function drawTile(col, row, color, alpha) {
      if (row < 0) return;
      var pad = 1;
      var x = col * CELL + pad;
      var y = row * CELL + pad;
      var size = CELL - pad * 2;
      ctx.save();
      ctx.globalAlpha = typeof alpha === "number" ? alpha : 1;
      ctx.fillStyle = color;
      roundRect(x, y, size, size, 1.8);
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      var dark = isDark();
      var palette = dark ? PALETTE_DARK : PALETTE_LIGHT;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.06)" : "rgba(24, 24, 27, 0.065)";
      for (var gr = 0; gr < ROWS; gr++) {
        for (var gc = 0; gc < COLS; gc++) {
          ctx.fillRect(gc * CELL + CELL / 2 - 0.5, gr * CELL + CELL / 2 - 0.5, 1, 1);
        }
      }

      var tileAlpha = running ? 0.96 : 0.78;
      for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
          var t = board[r][c];
          if (t) drawTile(c, r, palette[t], tileAlpha);
        }
      }

      if (current && !gameOver) {
        var gy = ghostY();
        if (running && gy > current.y) {
          ctx.save();
          ctx.strokeStyle = dark ? "rgba(255, 133, 89, 0.34)" : "rgba(217, 78, 31, 0.28)";
          ctx.lineWidth = 1;
          for (var mr = 0; mr < current.matrix.length; mr++) {
            for (var mc = 0; mc < current.matrix[mr].length; mc++) {
              if (!current.matrix[mr][mc]) continue;
              var gx = (current.x + mc) * CELL + 1.5;
              var gpy = (gy + mr) * CELL + 1.5;
              roundRect(gx, gpy, CELL - 3, CELL - 3, 1.5);
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        for (var pr = 0; pr < current.matrix.length; pr++) {
          for (var pc = 0; pc < current.matrix[pr].length; pc++) {
            if (!current.matrix[pr][pc]) continue;
            drawTile(
              current.x + pc,
              current.y + pr,
              palette[current.type],
              running ? 1 : 0.88
            );
          }
        }
      }

      if (gameOver) {
        ctx.save();
        ctx.fillStyle = dark ? "rgba(20, 20, 22, 0.82)" : "rgba(255, 255, 255, 0.84)";
        ctx.fillRect(0, height / 2 - 22, width, 44);
        ctx.fillStyle = dark ? "#f4f4f6" : "#18181b";
        ctx.font = "600 10px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", width / 2, height / 2 - 4);
        ctx.fillStyle = dark ? "#ff8559" : "#d94e1f";
        ctx.font = "500 9px system-ui, -apple-system, sans-serif";
        ctx.fillText("Click or ↑ to retry", width / 2, height / 2 + 11);
        ctx.restore();
      }
    }

    canvas.addEventListener("click", function () {
      if (!isDesktop()) return;
      if (gameOver) {
        resetFreshGame(true);
      } else if (running) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!isDesktop()) return;
        resetFreshGame(true);
      });
    }

    document.addEventListener("mousedown", function (e) {
      if (!running) return;
      var nav = document.getElementById("navbar");
      if (nav && !nav.contains(e.target)) {
        stopLoop();
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
        if (gameOver) {
          resetFreshGame(true);
          return;
        }
        if (!running) {
          startLoop();
        }
        if (key === "ArrowLeft") moveHorizontal(-1);
        else if (key === "ArrowRight") moveHorizontal(1);
        else if (key === "ArrowUp") rotateCurrent();
        else if (key === "ArrowDown") {
          stepDown();
          if (running && !gameOver) scheduleTick();
        }
        return;
      }

      if (running && (key === " " || key === "Spacebar")) {
        e.preventDefault();
        hardDrop();
        return;
      }

      if (running && key === "Escape") {
        e.preventDefault();
        stopLoop();
      }
    });

    if (window.MutationObserver) {
      var observer = new MutationObserver(function () {
        draw();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    window.addEventListener("resize", function () {
      if (!isDesktop() && running) {
        stopLoop();
      }
    });

    seedSculpture();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSidebarTetris);
  } else {
    initSidebarTetris();
  }
})();
