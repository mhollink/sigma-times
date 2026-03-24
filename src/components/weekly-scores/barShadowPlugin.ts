export const barShadowPlugin = {
    id: "barShadow",
    afterDatasetsDraw: (chart: any) => {
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar: any) => {
                ctx.save();
                ctx.shadowColor = "rgba(0, 255, 200, 0.4)"; // neon glow color
                ctx.shadowBlur = 8; // how soft the glow is
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = bar.options.backgroundColor;
                ctx.fillRect(bar.x - bar.width / 2, bar.y, bar.width, bar.base - bar.y);
                ctx.restore();
            });
        });
    },
};