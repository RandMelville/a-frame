function showSnow() {
    const elements = getSingularNaturalElements();
    showSpecificElement("snow", elements);
    playSphereSound("snowSphere");
}

function hideSnow() {
    const elements = getSingularNaturalElements();
    hideSpecificElement("snow", elements);
    stopSphereSound("snowSphere");
}

function showRain() {
    const elements = getSingularNaturalElements();
    showSpecificElement("rain", elements);
    playSphereSound("rainSphere");
}

function hideRain() {
    const elements = getSingularNaturalElements();
    hideSpecificElement("rain", elements);
    stopSphereSound("rainSphere");
}

function showDust() {
    const elements = getSingularNaturalElements();
    showSpecificElement("dust", elements);
    playSphereSound("dustSphere");
}

function hideDust() {
    const elements = getSingularNaturalElements();
    hideSpecificElement("dust", elements);
    stopSphereSound("dustSphere");
}

function showDay() {
    let element = document.getElementById("env");
    let environmentAttribute = element.getAttribute("environment");

    environmentAttribute.active = true;
    environmentAttribute.preset = "default";
    environmentAttribute.seed = "1";
    environmentAttribute.skyType = "atmosphere";
    environmentAttribute.skyColor = "#24b59f";
    environmentAttribute.horizonColor = "#eff9b7"
    environmentAttribute.lighting = "distant";
    environmentAttribute.shadow = "true";
    environmentAttribute.shadowSize = "10";
    environmentAttribute.lightPosition = { "x": 0, "y": 1, "z": -1 };
    environmentAttribute.fog = "0.78";
    environmentAttribute.flatShading= "false";
    environmentAttribute.playArea = "1"
    environmentAttribute.ground = "noise";
    environmentAttribute.groundYScale = "0"
    environmentAttribute.groundTexture = "walkernoise";
    environmentAttribute.groundColor = "#454545";
    environmentAttribute.groundColor2 = "#5d5d5d";
    environmentAttribute.dressing = "none";
    environmentAttribute.dressingAmount = "10"
    environmentAttribute.dressingColor = "#795449";
    environmentAttribute.dressingScale = "1";
    environmentAttribute.dressingVariance = { "x": 0, "y": 0, "z": 0 };
    environmentAttribute.dressingUniformScale = "true";
    environmentAttribute.dressingOnPlayArea = "0";
    environmentAttribute.grid = "none";
    environmentAttribute.gridColor = "#ccc";

    element.setAttribute("environment", environmentAttribute)
}

function showGradativeNight() {
    var element = document.getElementById("env");
    var environmentAttribute = element.getAttribute("environment");
    var positionY = environmentAttribute.lightPosition.y;

    function updatePosition() {
        if (positionY > -0.1) {
            positionY -= 0.01;
            environmentAttribute.lightPosition.y = positionY;
            element.setAttribute("environment", environmentAttribute);
            setTimeout(updatePosition, 100);
        } else {
            stopSphereSound("daySphere");
            playSphereSound("nightSphere")
        }
    }

    updatePosition();
}

function showGradativeDay() {
    var element = document.getElementById("env");
    var environmentAttribute = element.getAttribute("environment");
    var positionY = environmentAttribute.lightPosition.y;

    function updatePosition() {
        if (positionY < 1) {
            positionY += 0.01;
            environmentAttribute.lightPosition.y = positionY;
            element.setAttribute("environment", environmentAttribute);
            setTimeout(updatePosition, 100);
        } else {
            stopSphereSound("nightSphere");
            playSphereSound("daySphere")
        }
    }

    updatePosition();
}

function getSingularNaturalElements() {
    return Array.from(document.getElementsByClassName("singularNaturalElement"));
}

function showSpecificElement(elementId, elements) {
    elements.forEach((element) => {
        if (element.id == elementId) {
            element.setAttribute("visible", true)
        }
    });
}

function hideSpecificElement(elementId, elements) {
    elements.forEach((element) => {
        if (element.id == elementId) {
            element.setAttribute("visible", false)
        }
    });
}

function playSphereSound(sphereId) {
    document.getElementById(sphereId).components.sound.playSound();
}

function stopSphereSound(sphereId) {
    document.getElementById(sphereId).components.sound.stopSound();
}

export {
         showSnow, hideSnow, showRain, hideRain, showDust, hideDust, showDay, showGradativeDay,
         showGradativeNight, playSphereSound, stopSphereSound
 };