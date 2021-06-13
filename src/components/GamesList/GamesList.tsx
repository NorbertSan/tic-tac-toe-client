import { Tabs } from "antd";
import OpenGames from "./OpenGames/OpenGames";

const GamesList: React.FC = () => {
  const onTabChange = (): void => {};

  return (
    <section className="max-w-screen-lg w-full mx-auto">
      <Tabs centered defaultActiveKey="0" onChange={onTabChange}>
        <Tabs.TabPane tab="Open games" key="0">
          <OpenGames />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Pending games" key="1">
        </Tabs.TabPane> */}
      </Tabs>
    </section>
  );
};

export default GamesList;
