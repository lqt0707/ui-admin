import { createApp } from "vue";
import SButton from "./button";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";
import SmartyUI from "./entry";

createApp({
  template: `
        <div>
            <SButton>普通按钮</SButton>
        </div>
    `,
})
  .use(SmartyUI)
  .mount("#app");
