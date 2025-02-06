# 🖥️ Mouseless

## About
The aim of this project is to not use the mouse at all! Instead, try to leverage the keyboard as much as possible for most click events. 🚀

## Demo
🎥 *Coming Soon*

## Todos
- [ ] 🐛 Fix broken mouse clicks on Wayland (See: [robotgo #636](https://github.com/go-vgo/robotgo/issues/636))
- [ ] 🪟 Fix the translucent effect on fullscreen (when the app opens, it currently takes an empty background instead of the original background)
- [ ] 🚫 Make text unselectable
- [ ] 🛠 Remove hardcoded pixel values
    ```go
    DClick(pixel.x+20, pixel.y+60);
    ```
- [ ] 💻 Add support for Windows and Mac OS if possible

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on [http://localhost:34115](http://localhost:34115). Connect
to this in your browser, and you can call your Go code from devtools.

> [!IMPORTANT]
> Make sure to install [Wails.io](https://wails.io/docs/gettingstarted/installation) required dependencies.

## Building

To build a redistributable, production mode package, use `wails build`.
