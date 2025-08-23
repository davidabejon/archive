import { Tabs } from "antd"
import Overview from "./Overview"
import Characters from "./Characters"

function EntryTabs({ relations, characters, staff }) {
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
            />,
        },
        {
          key: '2',
          label: 'Characters',
          children: <Characters characters={characters} />,
        },
        {
          key: '3',
          label: 'Staff',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '4',
          label: 'Stats',
          children: 'Content of Tab Pane 3',
        }
      ]} />
    </div>
  )
}

export default EntryTabs