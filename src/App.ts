class App {

    public static get Observer(): Observer {
        return Observer.instance;
    }

    public static get UIAdapter(): UIAdapter {
        return UIAdapter.instance();
    }

    public static get GlobalObject(): GlobalObject {
        return GlobalObject.instance;
    }

    public static get GameController(): GameController {
        return GameController.instance;
    }

    public static get LayerManager(): LayerManager {
        return LayerManager.instance;
    }
}