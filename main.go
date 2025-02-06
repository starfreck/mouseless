package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "mouseless",
		WindowStartState: options.Fullscreen,
		Frameless:        true,
		AlwaysOnTop:      false,
		StartHidden:      true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 20},
		OnStartup:        app.startup,
		OnDomReady:       app.onDomReady,
		Bind: []interface{}{
			app,
		},
		Linux: &linux.Options{
			WindowIsTranslucent: true,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyOnDemand,
			ProgramName:         "mouseless",
		},
		Debug: options.Debug{OpenInspectorOnStartup: true},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
