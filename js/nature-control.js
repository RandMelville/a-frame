function showTrees() {
    const trees = Array.from(document.getElementsByTagName("a-entity")).filter((e) => e.id.startsWith("entityTree"))
    trees.forEach((t) => { t.setAttribute('visible', true) })
}

function hideTrees() {
    const trees = Array.from(document.getElementsByTagName("a-entity")).filter((e) => e.id.startsWith("entityTree"))
    trees.forEach((t) => { t.setAttribute('visible', false) })
}

function configureEnvironment() {
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
    environmentAttribute.groundYScale = "4"
    environmentAttribute.groundTexture = "walkernoise";
    environmentAttribute.groundColor = "#8B5A2B";
    environmentAttribute.groundColor2 = "#556B2F";
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

function generateTrees() {
    const assets = document.querySelector('a-assets').querySelectorAll('a-asset-items');
    const treeModelIds = Array.from(assets).filter((a) => a.id.startsWith("treeModel")).map((t) => "#" + t.getAttribute("id"));
    const scene = document.getElementById("scene")

    const spacingX = 10;
    const spacingZ = 10;
    const numTreesX = 8;
    const numTreesZ = 8;

    const startX = -spacingX * (numTreesX - 1) / 2;
    const startZ = -spacingZ * (numTreesZ - 1) / 2;

    let index = 0

    for (let i = 0; i < numTreesX; i++) {
        for (let j = 0; j < numTreesZ; j++) {
            const randomPosition = Math.floor(Math.random() * treeModelIds.length);

            let entity = document.createElement("a-entity")
            entity.setAttribute('id', "entityTree" + index);
            entity.setAttribute("class", "grabbable-obj")
            entity.setAttribute("grabbable", "");
            entity.setAttribute('visible', false)
            entity.setAttribute("gltf-model", treeModelIds[randomPosition])
            entity.setAttribute('position', {
                x: startX + i * spacingX,
                y: 0,
                z: startZ + j * spacingZ
            });

            scene.appendChild(entity);
            index++
        }
    }
}

function animateTree(entity) {
    let angle = 0;
    let maxAngle = 3;
    const swingSpeed = 0.01;
    const duration = 3000;
    let startTimestamp = null;

    function animate(timestamp) {
        if (!startTimestamp) {
            startTimestamp = timestamp;
        }

        const progress = timestamp - startTimestamp;
        maxAngle = 3 - (progress / duration) * 10;
        if (maxAngle <= 0) {
            maxAngle = 0;
            return;
        }

        angle = Math.sin(progress * swingSpeed) * maxAngle;
        entity.setAttribute('rotation', { x: angle, y: entity.getAttribute('rotation').y, z: entity.getAttribute('rotation').z });
        requestAnimationFrame(animate);
    }

    startTimestamp = null;
    requestAnimationFrame(animate);
}

export { showTrees , hideTrees, configureEnvironment, generateTrees, animateTree };
