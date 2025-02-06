package main

import (
	"context"
	"fmt"
	"log"

	"github.com/go-vgo/robotgo"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	robotgo.Click("left", true)
	robotgo.Sleep(10)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) onDomReady(ctx context.Context) {
	a.ctx = ctx
	//runtime.WindowSetSystemDefaultTheme(a.ctx)
	//runtime.WindowSetBackgroundColour(a.ctx, 0, 0, 0, 128)
	runtime.WindowShow(a.ctx)
	// time.Sleep(1 * time.Second)
	// runtime.WindowHide(a.ctx)
	// time.Sleep(10 * time.Second)
	// runtime.WindowShow(a.ctx)
}

// Greet returns a greeting for the given name
func (a App) GoLog(str string) {
	log.Printf("%s\n", str)
}

func (a *App) DoubleClick(x, y int) {
	log.Printf("DoubleClick (X,Y):(%d,%d)\n", x, y)
	log.Println("Before Double click")
	// Double Click
	robotgo.MoveClick(x, y, "left", true)
	runtime.WindowHide(a.ctx)
	log.Println("After Double click")
	robotgo.Kill(robotgo.GetPid())
	runtime.Quit(a.ctx)
}

func (a *App) Click(x, y int) {
	log.Printf("Click (X,Y):(%d,%d)\n", x, y)
	log.Println("Before Single click")
	// Single Click
	robotgo.MoveClick(x, y, "left", false)
	runtime.WindowHide(a.ctx)
	log.Println("After Single click")
	robotgo.Kill(robotgo.GetPid())
	runtime.Quit(a.ctx)
}

func (a *App) CaptureScreen(x, y, w, h float64) {
	log.Printf("X:%f, Y:%f, W:%f, H:%f\n", x, y, w, h)
	// bit := robotgo.CaptureScreen(int(x), int(y), int(w), int(h))
	// defer robotgo.FreeBitmap(bit)
	// img := robotgo.ToImage(bit)
	// imgo.Save("test.png", img)
}
