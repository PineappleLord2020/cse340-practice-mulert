res.locals.scripts.push(`
    <script>
        const ws = new WebSocket('ws://127.0.0.1:${parseInt(port) + 1}');
        ws.onclose = () => {
            setTimeout(() => location.reload(), 2000);
        };
    </script>   
`);