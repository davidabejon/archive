import { Tabs } from "antd"
import Overview from "./Overview"
import Characters from "./Characters"
import Staff from "./Staff"

function EntryTabs({ relations, characters, staff, trailer }) {
  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={[
        {
          key: '1',
          label: 'Overview',
          children:
            <Overview
              relations={relations}
              characters={characters?.filter((_, index) => index < 6)}
              staff={staff?.filter((_, index) => index < 3)}
              trailer={trailer}
            />,
        },
        {
          key: '2',
          label: 'Characters',
          children: <Characters />,
        },
        {
          key: '3',
          label: 'Staff',
          children: <Staff />,
        },
        // {
        //   key: '4',
        //   label: 'Stats',
        //   children: 'Content of Tab Pane 3',
        // }
      ]} />
    </div>
  )
}

export default EntryTabs