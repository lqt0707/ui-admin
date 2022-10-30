import { App } from "vue";
import SButon from "./button copy";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";
// 导出单独组件
export { SButon, SFCButton, JSXButton };
// 编写一个插件，实现一个install方法
export default {
  install(app: App): void {
    app.component(SButon.name, SButon);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
