import React from "react";
import cx from "classnames";
import "./tab.scss";

const Tab = ({ data, onClose, onSelectTab, selectedTab }) => {
  return (
    <div
      id={data.index}
      className={cx("tab-main-cont", selectedTab === data.id && "selected-tab")}
      onClick={onSelectTab}
    >
      {data.tabName}
      <div className="close" onClick={onClose}>
        x
      </div>
    </div>
  );
};

export default Tab;
