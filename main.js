window.onload = () => {
  //   let preData = JSON.parse(localStorage.colors);
  //   localStorage.clear();
  main();
};
// window.addEventListener("beforeunload", (e) => {
//   e.preventDefault();
//   localStorage.setItem("colors", JSON.stringify(allColors.colors));
//   e.returnValue = "";

// });

class Colors {
  constructor() {
    this.colors = [];
    return this;
  }
  setPreData(arr) {
    this.colors = arr;
  }
  appendColor(colorCode) {
    let colorInfo = {
      code: colorCode,
      like: false,
    };
    this.colors.push(colorInfo);
    return this;
  }
  addLike(ind) {
    this.colors[ind].like = !this.colors[ind].like;
  }
  clearColor(ind = null) {
    this.colors[ind] = false;
    this.colors = this.colors.filter(Boolean);
  }
  formate() {
    this.colors.sort((a, b) => {
      if (a.like) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  clearColors() {
    this.colors = [];
  }
}

function rgbToHex(code) {
  let hex = `#${code
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;
  return hex;
}

let allColors = new Colors();
allColors.appendColor(
  rgbToHex(
    window
      .getComputedStyle(document.body, null)
      .getPropertyValue("background-color")
  )
);

function main(/*prev*/) {
  //   if (prev.length) {
  //     allColors.setPreData(prev);
  //     updateOptions(allColors);
  //   } else {
  //     allColors.appendColor(
  //       rgbToHex(
  //         window
  //           .getComputedStyle(document.body, null)
  //           .getPropertyValue("background-color")
  //       )
  //     );
  //   }
  nowActive(0, allColors.colors[0]);
  let chang_btn = document.getElementById("chang_btn");
  let body = document.body;
  let left_btn = document.getElementById("left");
  let right_btn = document.getElementById("right");
  let color_out = document.getElementById("color");

  chang_btn.addEventListener("click", function () {
    let color = parseInt(Math.random() * 10000000).toString(16);

    body.style.backgroundColor = `#${color}`;
    color_out.innerHTML = `#${color}`;
    allColors.appendColor(`#${color}`);
    updateOptions(allColors);
  });
}

function updateOptions(colors) {
  let dropdownOptins = document.getElementById("dropdownOptins");
  let options = "";
  for (let i = 0; i < colors.colors.length; i++) {
    let { code, like } = colors.colors[i];
    options =
      options +
      `
        <div class="option_row" style='background-color: ${code};' data-index='${i}'>
            <span onclick="activeThis(${i})" class="color_code">${code}</span>
            <button onclick="likeIt(this)" data-index='${i}'>
             <img src="${like ? "./img/liked.png" : "./img/like.png"}" alt="">
            </button>
        </div>
    `;
  }
  dropdownOptins.innerHTML = options;
}

function dropdown(ele) {
  let optEle = document.getElementById(ele.dataset.options);
  if (ele.dataset.show === "false") {
    ele.children[0].classList.add("up");
    optEle.classList.add("show");
    ele.dataset.show = true;
  } else {
    ele.children[0].classList.remove("up");
    optEle.classList.remove("show");
    ele.dataset.show = false;
  }
}

function likeIt(ele) {
  let index = ele.dataset.index;
  if (allColors.colors[index].like) {
    allColors.addLike(index);
    ele.children[0].src = "./img/like.png";
  } else {
    allColors.addLike(index);
    ele.children[0].src = "./img/liked.png";
  }
  allColors.formate();
  updateOptions()
}

function nowActive(index) {
  let row = document.getElementById("activRow");
  row.dataset.index = index;
  let span = row.getElementsByTagName("span");
  let img = row.getElementsByTagName("img");
  let likeBtn= row.getElementsByTagName('button')
  span[0].innerHTML = allColors.colors[index].code;
  img[0].src = allColors.colors[index].like ? "./img/liked.png" : "./img/like.png";
  likeBtn[0].dataset.index=index
}
function activeThis(index) {
  document.body.style.background=allColors.colors[index].code
  nowActive(index,allColors.colors[index])
}
