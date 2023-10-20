import "./style.scss";
import randomColor from "randomcolor";

async function main() {
  console.log(randomColor);
  const Petals = "http://localhost:3000/Petals";
  const resp = await fetch(Petals);
  const data = await resp.json();
  console.log(data);
  const containerPetal = document.querySelector(".flower");
  const mid = document.querySelector(".mid");
  containerPetal.innerHTML = data
    .map(
      ({
        id,
        position,
        x,
        width,
        height,
        borderRadius,
        color1,
        color2,
        filter,
        transform,
        zIndex,
      }) => ` <div class="Petal" id="petal-${id}" style="position:${position};
      top:${x}px;
      width:${width}px;
      height:${height}px;
      background:radial-gradient(circle, ${color1},${color2});
      border-radius: ${borderRadius}%;
      filter:${filter};
      transform: rotate(${transform}deg);
      z-index:${zIndex};"></div>`
    )
    .join("");
  document.body.onclick = async (e) => {
    console.log(e.target);
    if (e.target.nodeName === "DIV") {
      const changeColor = randomColor({
        hue: "pink",
        luminosity: "bright",
      });
      const clickedPetal = e.target.dataset.id;
      e.target.style.background = changeColor;
      await fetch(Petals + clickedPetal, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: clickedPetal,
          color1: changeColor,
          color2: changeColor,
        }),
      });
    }
  };
  document.body.ondblclick = async (e) => {
    if (e.target.nodeName === "DIV") {
      const clickedPetal = e.target;
      const Id = clickedPetal.getAttribute("id".replace("petal-", ""));
      clickedPetal.remove();
      await fetch(Petals + Id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
}
main();
