import SummaryCard from './SummaryCard'

export default function SummaryCards(props) {
  return (
    <div className=" flex flex-wrap sm:flex-nowrap gap-x-4">
      <SummaryCard
        data={{
          title: 'CPS',
          value: '126',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'Connectivity',
          value: '93%',
          subValue: '+1.2%',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'ASR (Connected)',
          value: '72%',
          subValue: '+11%',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'ASR (Global)',
          value: '65%',
          subValue: '+5.2%',
        }}
      ></SummaryCard>
    </div>
  )
}
