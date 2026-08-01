export function initHeroNetwork() {
    

    const canvas = document.getElementById("hero-network");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // Número de nodos
    const NODE_COUNT = 18;

    const nodes = [];

    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * 650,
            y: Math.random() * 140,
            offset: Math.random() * Math.PI * 2
        });
    }

    const edges = [];

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {
                edges.push([i, j]);
            }
        }
    }

    // desfase distinto
    nodes.forEach(node => {
        node.offset = Math.random() * Math.PI * 2;
    });

    let time = 0;

    function draw() {
        const styles = getComputedStyle(document.documentElement);

        const nodeColor = styles.getPropertyValue("--v-color").trim();
        const lineColor = styles.getPropertyValue("--v-color").trim();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        time += 0.02;

        // Escalado para que funcione con cualquier ancho
        const scaleX = canvas.width / 650;
        const scaleY = canvas.height / 140;

        // Actualizar posición animada
        nodes.forEach(node => {
            node.drawX = (node.x + Math.sin(time + node.offset) * 3) * scaleX;
            node.drawY = (node.y + Math.cos(time + node.offset) * 3) * scaleY;

        });

        // Dibujar líneas
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5;

        edges.forEach(([a, b]) => {

            ctx.beginPath();

            ctx.moveTo(nodes[a].drawX, nodes[a].drawY);
            ctx.lineTo(nodes[b].drawX, nodes[b].drawY);

            ctx.stroke();

        });

        // Dibujar nodos
        nodes.forEach(node => {

            ctx.beginPath();

            ctx.arc(
                node.drawX,
                node.drawY,
                3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = nodeColor;
            ctx.fill();

        });

        requestAnimationFrame(draw);
    }
    
    draw();
}