import React, { useEffect, useState } from "react";
import "./main.scss";
import Tab from "../Tab/Tab";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const Main = () => {
  const [tabData, setTabData] = useState([
    { id: 0, tabName: "Tab 0" },
    { id: 1, tabName: "Tab 1" },
    { id: 2, tabName: "Tab 2" },
  ]);
  const [leftChevronVisible, setLeftChevronVisible] = useState(false);
  const [rightChevronVisible, setRightChevronVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    function handleResize() {
      handleOnScroll();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handeAddTab = () => {
    const tabElement = document.getElementsByClassName("dl-list")[0];
    const tabContainerElement = document.getElementById("tab-container");
    if (tabElement.scrollWidth > tabContainerElement.clientWidth) {
      setRightChevronVisible(true);
    } else {
      setRightChevronVisible(false);
      setLeftChevronVisible(false);
    }

    if (tabData.length < 10) {
      setTabData([
        ...tabData,
        { id: tabData.length, tabName: `Tab ${tabData.length}` },
      ]);
    }
  };

  const handleRLDDChange = (newItems) => {
    setTabData(newItems);
  };

  const handleTabSelect = (tabData) => {
    setSelectedTab(tabData.id);
  };

  const handleCloseTab = (tab) => {
    if (tabData.length > 3) {
      const data = tabData.filter((a) => a.id !== tab.id);
      setTabData(data);
    }
  };

  const handleScrollRight = () => {
    const ele = document.getElementById("tab-container");
    ele.scrollTo(ele.scrollLeft + 80, 0);
  };
  const handleScrollLeft = () => {
    const ele = document.getElementById("tab-container");
    ele.scrollTo(ele.scrollLeft - 80, 0);
  };

  const handleOnScroll = () => {
    const tabContainerElement = document.getElementById("tab-container");
    if (tabContainerElement.scrollLeft === 0) {
      setLeftChevronVisible(false);
    } else {
      setLeftChevronVisible(true);
    }
    if (
      tabContainerElement.scrollWidth - tabContainerElement.clientWidth - 2 <
      tabContainerElement.scrollLeft
    ) {
      setRightChevronVisible(false);
    } else {
      setRightChevronVisible(true);
    }
  };
  return (
    <div className="main-container">
      {leftChevronVisible && (
        <button className="left-arrow" onClick={handleScrollLeft}>{`<`}</button>
      )}
      <div
        id="tab-container"
        className="tab-scroll-container"
        onScroll={handleOnScroll}
      >
        <RLDD
          items={tabData}
          layout="horizontal"
          itemRenderer={(tab) => {
            return (
              <Tab
                data={tab}
                onSelectTab={() => handleTabSelect(tab)}
                onClose={() => handleCloseTab(tab)}
                selectedTab={selectedTab}
              />
            );
          }}
          onChange={handleRLDDChange}
        />
      </div>
      {rightChevronVisible && (
        <button
          className="right-arrow"
          onClick={handleScrollRight}
        >{`>`}</button>
      )}
      <button className="add-icon" onClick={handeAddTab}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default Main;
