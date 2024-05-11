AFRAME.registerComponent('rounded-rectangle', {
    schema: {
      width: {type: 'number', default: 1},
      height: {type: 'number', default: 1},
      radius: {type: 'number', default: 0.1},
      color: {type: 'color', default: '#ffffff'},
      opacity: {type: 'number', default: 1, min: 0, max: 1},
      animationTo: {type: 'string', default: '0 0 0'}
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
  
      var roundedRectShape = new THREE.Shape();
      var x = 0;
      var y = 0;
      var width = data.width;
      var height = data.height;
      var radius = data.radius;
  
      roundedRectShape.moveTo(x, y + radius);
      roundedRectShape.lineTo(x, y + height - radius);
      roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
      roundedRectShape.lineTo(x + width - radius, y + height);
      roundedRectShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
      roundedRectShape.lineTo(x + width, y + radius);
      roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
      roundedRectShape.lineTo(x + radius, y);
      roundedRectShape.quadraticCurveTo(x, y, x, y + radius);
  
      var geometry = new THREE.ShapeGeometry(roundedRectShape);
      var material = new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: data.opacity });
      var mesh = new THREE.Mesh(geometry, material);
  
      el.setObject3D('mesh', mesh);
  
      el.setAttribute('animation', `property: position; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; to: ${data.animationTo}`);
    },
  
    update: function () {
      this.init();
    }
  });