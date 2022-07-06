import m from "mithril";
import settings from "../config/settings";
import Media from "./media";
import { List } from "../views/galery";
import { rounded, random } from "../utility/index";
import Swiper, { Navigation as navigation } from "swiper";
import "swiper/css/bundle";

/**
 * @description Composant permettant de manipuller un tableau de media
 * @param index la valeur actuel
 * @param total le nombre total
 */

const Navigation = {
  inputOn: false,
  view(vnode) {
    return (
      <div class="d-flex justify-content-between mb-3 py-3">
        <div class="d-flex">
          <button
            aria-label="first"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(0);
            }}
          >
            {" "}
            {"<<"}{" "}
          </button>
          <button
            aria-label="prev"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(
                rounded(vnode.attrs.index - 1, vnode.attrs.total)
              );
            }}
          >
            {" "}
            {"<"}{" "}
          </button>
          <button
            aria-label="random"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(random(0, vnode.attrs.total));
            }}
          >
            <i class="bi bi-dice-5-fill"></i>
          </button>
        </div>

        {vnode.state.inputOn ? (
          <input
            type="number"
            min=""
            max={vnode.attrs.total}
            class="form-control"
            value={vnode.attrs.index + 1}
            onchange={(e) => {
              vnode.attrs.set(rounded(e.target.value - 1, vnode.attrs.total));
              vnode.state.inputOn = false;
            }}
          ></input>
        ) : (
          <label
            class={"text-" + settings.textTheme}
            onclick={() => {
              vnode.state.inputOn = true;
            }}
          >
            {"n° " + (vnode.attrs.index + 1) + " de " + vnode.attrs.total}
          </label>
        )}
        <div class="d-flex">
          <button
            aria-label="random"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(random(0, vnode.attrs.total));
            }}
          >
            <i class="bi bi-dice-5-fill" />
          </button>
          <button
            aria-label="next"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(
                rounded(vnode.attrs.index + 1, vnode.attrs.total)
              );
            }}
          >
            {">"}
          </button>
          <button
            aria-label="last"
            type="button"
            class={"btn btn-outline-" + settings.colorOutline + " mx-1"}
            onclick={() => {
              vnode.attrs.set(vnode.attrs.total - 1);
            }}
          >
            {">>"}
          </button>
        </div>
      </div>
    );
  },
};
/**
 * @description Media list view that shows one at a time
 * @param current
 * @param index la valeur actuel
 * @param total le nombre total
 * @param src le chemin vers le media
 * @param class la class du media
 */
export const ListSingleView = {
  oninit() {
    document.addEventListener("keydown", clickHandler);
  },
  onremove() {
    document.removeEventListener("keydown", clickHandler);
  },
  view(vnode) {
    return (
      <div>
        <Navigation
          set={vnode.attrs.set}
          index={vnode.attrs.index}
          total={vnode.attrs.total}
        />
        <div
          class="d-flex justify-content-center"
          onclick={
            /.(jpg|png|gif|jpeg)$/.test(vnode.attrs.media.src)
              ? (e) => {
                  const step = e.x > e.target.scrollWidth / 2 ? 1 : -1;
                  vnode.attrs.set(
                    rounded(vnode.attrs.index + step, vnode.attrs.total)
                  );
                }
              : null
          }
        >
          <Media
            src={vnode.attrs.media.src}
            width={vnode.attrs.media.width}
            height={vnode.attrs.media.height}
            class={vnode.attrs.class}
          />
        </div>
        <Navigation
          set={vnode.attrs.set}
          index={vnode.attrs.index}
          total={vnode.attrs.total}
        />
      </div>
    );
  },
};
/**
 * @description Media list view that shows one at a time
 * @param value La liste des media
 * @param class la class du media
 */
export const ListAllView = {
  view(vnode) {
    return (
      <div>
        {vnode.attrs.values.map((value, id) => {
          return (
            <div key={id} class="d-flex justify-content-center">
              <Media
                src={value.src}
                width={value.width}
                height={value.height}
                class={vnode.attrs.class}
              />
            </div>
          );
        })}
      </div>
    );
  },
};
export const ListSingleViewSwiper = {
  swiper: undefined,
  oninit() {
    document.addEventListener("keydown", clickHandler);
  },
  oncreate(vnode) {
    ListSingleViewSwiper.swiper = new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      grabCursor: true,
      initialSlide: vnode.attrs.index,
      loop: true,
      modules: [navigation],
      on: {
        slideChangeTransitionEnd(swiper) {
          vnode.attrs.set(swiper.activeIndex);
        },
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      centeredSlides: true,
      effect: "fade", // | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
      // autoHeight: true,
      pagination: {
        el: ".swiper-pagination",
      },

      // // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // // And if we need scrollbar
      // scrollbar: {
      // 	el: '.swiper-scrollbar',
      // },
    });
  },
  onremove() {
    document.removeEventListener("keydown", clickHandler);
  },
  view(vnode) {
    return (
      <div>
        <div class="swiper">
          <div
            class={
              "swiper-wrapper d-flex justify-content-center" + vnode.attrs.class
            }
          >
            {vnode.attrs.values.map((value, id) => (
              <div key={id} class="swiper-slide">
                <Media
                  src={value.src}
                  width={value.width}
                  height={value.height}
                  class={vnode.attrs.class}
                />
              </div>
            ))}
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    );
  },
};
function clickHandler(e) {
  if (e.key === "ArrowRight") {
    List.curent = rounded(List.curentIndex + 1, List.values.length);
    m.redraw();
  } else if (e.key === "ArrowLeft") {
    List.curent = rounded(List.curentIndex - 1, List.values.length);
    m.redraw();
  }
}
const slideEventHandler = {
  mousedown: false,
  target: undefined,
  onmousedown(e) {
    slideEventHandler.mousedown = true;
  },
  onmouseup(e) {
    slideEventHandler.mousedown = false;
  },
  onmousemove(e) {
    if (slideEventHandler.mousedown) e.target.postion.x = 0;
  },
};
// TODO: Add Horizontal Scrolling
// TODO: Implement UC brwosertype image browsing
