import { PieChart, Pie, Cell} from "recharts"
type TypePropSpedometer = {
    value: number
    maxValue: number
    satuan: string
}
export default function Speedometer({ value, maxValue, satuan }: TypePropSpedometer){
    const bagiMaxValue = maxValue / 5
    const RADIAN = Math.PI / 180;
    const data = [
      { name: 'A', value: bagiMaxValue, color: '#056e1e' },
      { name: 'B', value: bagiMaxValue, color: '#069126' },
      { name: 'C', value: bagiMaxValue, color: '#09b832' },
      { name: 'D', value: bagiMaxValue, color: '#19b4bf' },
      { name: 'E', value: bagiMaxValue, color: '#3660d1' },
    ];
    const cx = 145;
    const cy = 110;
    const iR = 35;
    const oR = 110;
    // const value = 30;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const needle = (value: number, data: any[], cx: number, cy: number, iR: number, oR: number, color: string) => {
        let total = 0;
        data.forEach((v) => {
          total += v.value;
        });
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;
      
        return [
          <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
          <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
      };
    return (
        <div className="-mt">
            <PieChart width={300} height={135}>
        <Pie dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
            </Pie>
            {needle(value, data, cx, cy, iR, oR, '#f23044')}
            </PieChart>
            <div className="w-full flex justify-between px-10">
                <p className="w-4 text-sm font-semibold text-graydark">0</p>
                <p className="w-6 font-bold text-graydark text-center">{value + `${satuan == "C" ? "\u00B0C" : satuan}`}  </p>
                <p className="w-4 text-sm font-semibold text-graydark">{maxValue}</p>
            </div>
        </div>
    )
}