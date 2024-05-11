import * as hands from "./hands-control.js"
import * as climate from "./climate-control.js"
import * as nature from "./nature-control.js"

function init() {
    climate.showDay();
    nature.generateTrees();
    hands.addHandsListeners();
}

window.addEventListener('DOMContentLoaded', init);
