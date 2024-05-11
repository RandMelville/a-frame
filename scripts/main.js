document.addEventListener("DOMContentLoaded", function() {
    // Geração da estrutura do labirinto
    generateMaze();

    const challengeElement = document.querySelector('#challenge');
    var switch1 = false;
    challengeElement.addEventListener('click', function () {
        if(switch1){
            var winner = document.getElementById('winner');
        winner.setAttribute('visible', true);
        }
        switch1 = true;
    });
});

function generateMaze() {
    const mazeElement = document.querySelector('#maze');

    // Gerando as coordenadas das paredes do labirinto
    const walls = generateOuterWalls().concat(generateInnerWalls());

    // Gerando as paredes do labirinto
    walls.forEach(function(wallCoords) {
        const wall = document.createElement('a-box');
        wall.setAttribute('position', `${wallCoords.x} 1 ${wallCoords.z}`);
        wall.setAttribute('width', '1');
        wall.setAttribute('height', '2.5');
        wall.setAttribute('depth', '1');
        wall.setAttribute('color', '#555');
        wall.setAttribute('static-body', '');
        wall.setAttribute('material','src: #asset_wall;');
        mazeElement.appendChild(wall);
    });

    function generateOuterWalls() {
        // Função para gerar as coordenadas das paredes externas de limite do labirinto
        const outerWalls = [];
        for (let i = -16; i <= 16; i++) {
            outerWalls.push({ x: -16, z: i });
            outerWalls.push({ x: 13, z: i });
            outerWalls.push({ x: i, z: -12 });
            outerWalls.push({ x: i, z: 16 });
        }
        return outerWalls;
    }
    
    function generateInnerWalls() {
        // Função para gerar as coordenadas das paredes internas do labirinto
        const innerWalls = [
            { x: -15, z: 12 }, { x: -14, z: 12 }, { x: -13, z: 12 }, { x: -12, z: 12 }, { x: -11, z: 12 }, { x: -10, z: 12 }, { x: -9, z: 12 }, { x: -8, z: 12 },
            { x: -4, z: 12 }, { x: -3, z: 12 }, { x: -2, z: 12 }, { x: -1, z: 12 }, { x: 0, z: 12 }, { x: 1, z: 12 }, { x: 2, z: 12 }, { x: 3, z: 12 }, 
            { x: 4, z: 12 }, { x: 5, z: 12 }, { x: 6, z: 12 }, { x: 7, z: 12 }, { x: 8, z: 12 }, { x: 9, z: 12 },
            { x: -15, z: 8 }, { x: -14, z: 8 }, { x: -13, z: 8 }, { x: -12, z: 8 }, { x: -8, z: 11 }, { x: -8, z: 10 }, { x: -8, z: 9 }, { x: -8, z: 8 }, 
            { x: -8, z: 7 }, { x: -8, z: 6 }, { x: -8, z: 5 }, { x: -8, z: 4 }, { x: -9, z: 4 }, { x: -10, z: 4 }, { x: -11, z: 4 }, { x: -12, z: 4 }, 
            { x: -8, z: 3 }, { x: -8, z: 2 }, { x: -8, z: 1 }, { x: -8, z: 0 }, { x: -8, z: -1 }, { x: -8, z: -2 }, { x: -8, z: -3 }, { x: -8, z: -4 }, 
            { x: -15, z: 0 }, { x: -14, z: 0 }, { x: -13, z: 0 }, { x: -12, z: 0 }, { x: -9, z: -4 }, { x: -10, z: -4 }, { x: -11, z: -4 }, { x: -12, z: -4 }, 
            { x: -12, z: -5 }, { x: -12, z: -6 }, { x: -12, z: -7 }, { x: -12, z: -8 }, { x: -8, z: -8 }, { x: -7, z: -8 }, { x: -6, z: -8 }, { x: -8, z: -9 }, 
            { x: -8, z: -10 }, { x: -8, z: -11 }, { x: -5, z: -8 }, { x: -4, z: -8 }, { x: -3, z: -8 }, { x: -8, z: -10 }, { x: -8, z: -11 }, { x: -5, z: -8 }, 
            { x: -4, z: -8 }, { x: -3, z: -8 }, { x: -7, z: -4 }, { x: -6, z: -4 }, { x: -5, z: -4 }, { x: -4, z: -4 }, { x: -3, z: -4 }, { x: -2, z: -4 },
            { x: -1, z: -4 }, { x: 0, z: -4 }, { x: 1, z: -4 },{ x: 1, z: -5 }, { x: 1, z: -6 }, { x: 1, z: -7 }, { x: 1, z: -8 }, { x: 5, z: -11 }, { x: 5, z: -10 },
            { x: 5, z: -9 }, { x: 5, z: -8 }, { x: 5, z: -7 }, { x: 5, z: -6 }, { x: 5, z: -5 }, { x: 5, z: -4 }, { x: 6, z: -4 }, { x: 7, z: -4 }, { x: 8, z: -4 }, 
            { x: 9, z: -4 }, { x: 9, z: -3 }, { x: 9, z: -2 }, { x: 9, z: -1 }, { x: 9, z: 0 }, { x: 12, z: -8 }, { x: 11, z: -8 }, { x: 10, z: -8 }, { x: 9, z: -8 },
            { x: 12, z: -8 }, { x: 11, z: -8 }, { x: -7, z: 8 }, { x: -6, z: 8 }, { x: -5, z: 8 }, { x: -4, z: 8 }, { x: -4, z: 7 }, { x: -4, z: 6 },  { x: -4, z: 5 }, 
            { x: -4, z: 4 }, { x: -4, z: 3 }, { x: -4, z: 2 }, { x: -4, z: 1 }, { x: -4, z: 0 }, { x: 12, z: 8 }, { x: 11, z: 8 }, { x: 10, z: 8 }, { x: 9, z: 8 }, 
            { x: 8, z: 8 }, { x: 7, z: 8 }, { x: 6, z: 8 }, { x: 5, z: 8 }, { x: 1, z: -3 }, { x: 1, z: -2 }, { x: 1, z: -1 }, { x: 1, z: 0 }, { x: 2, z: 0 }, 
            { x: 3, z: 0 }, { x: 4, z: 0 }, { x: 5, z: 0 }, { x: 5, z: 1 }, { x: 5, z: 2 }, { x: 5, z: 3 }, { x: 5, z: 4 }, { x: 6, z: 4 }, { x: 7, z: 4 }, { x: 8, z: 4 }, 
            { x: 9, z: 4 }, { x: 4, z: 4 }, { x: 3, z: 4 }, { x: 2, z: 4 }, { x: 1, z: 4 }, { x: 1, z: 5 }, { x: 1, z: 6 }, { x: 1, z: 7 }, { x: 1, z: 8 }, 
            { x: 1, z: 9 }, { x: 1, z: 10 }, { x: 1, z: 11 }
        ];
        return innerWalls;
    }
}