import { Tabs } from "antd";
import { useState } from "react";
import FinishedGames from "./FinishedGames/FinishedGames";
import OpenGames from "./OpenGames/OpenGames";

const GamesList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabChange = (activeKey: string): void => {
    setActiveTab(Number(activeKey));
  };

  return (
    <section className="max-w-screen-lg w-full mx-auto">
      <Tabs
        centered
        defaultActiveKey={activeTab.toString()}
        onChange={onTabChange}
      >
        <Tabs.TabPane tab="Open games" key={0}>
          <OpenGames active={activeTab === 0} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Finished games" key={1}>
          <FinishedGames active={activeTab === 1} />
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
};

export default GamesList;
