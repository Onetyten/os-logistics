import { useShipmentAnalysis } from '../hooks/shipmentAnalysis';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import SpotlightBorder from './SpotlightBorder';

export default function MonthlyShipment() {
    const { dailyshipmentChart } = useShipmentAnalysis();
    // const from = dailyshipmentChart[0].date;
    // const to = dailyshipmentChart[dailyshipmentChart.length - 1].day;

    return (
        <SpotlightBorder className="bg-boxclr rounded-md lg:col-span-2 xl:col-span-4 col-span-4 w-full row-span-2 sm:row-span-3 p-3 sm:p-6 overflow-hidden shadow-md">
            <p className="text-base text-primary font-semibold mb-8">Monthly Shipment</p>
            <div className='flex flex-col justify-center  h-full'>
             
              <div className='mb-20 text-muted'>
                  <CalendarHeatmap
                      values={dailyshipmentChart}
                    //   startDate={from}
                    //   endDate={to}
                      showOutOfRangeDays={false}
                      classForValue={(value) => {
                          if (!value || !value.value) return 'color-scale-0';
                          if (value.value < 2) return 'color-scale-1';
                          if (value.value < 4) return 'color-scale-2';
                          if (value.value < 6) return 'color-scale-3';
                          return 'color-scale-4';
                      }}
                      tooltipDataAttrs={(value) => ({
                          'data-tooltip-id': 'shipment-tooltip',
                          'data-tooltip-content': `${value.date || "" } ${value.date?":":""} ${value.value || 0} shipment${value.value>0?"s":""}`
                      })}
                  />
              </div>
              <Tooltip id="shipment-tooltip" />
            </div>
        </SpotlightBorder>
    );
}
