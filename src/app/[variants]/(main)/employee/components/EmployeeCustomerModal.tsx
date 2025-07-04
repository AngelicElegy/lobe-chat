import React from "react";
import { Modal, Button, Tabs, Checkbox } from "antd";
import { createStyles } from "antd-style";
import SkeletonList from "./SkeletonList";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

interface Customer {
  id: string;
  customerName: string;
  employeeName?: string;
  username?: string;
}

interface EmployeeCustomerModalProps {
  open: boolean;
  onClose: () => void;
  employee: any;
  sessionList: Customer[];
  employeeCustomers: string[];
  onSave: () => void;
  loading: boolean;
  customerTab: string;
  setCustomerTab: (tab: string) => void;
  selectedLeft: string[];
  setSelectedLeft: (ids: string[]) => void;
  selectedRight: string[];
  setSelectedRight: (ids: string[]) => void;
  moveToRight: () => void;
  moveToLeft: () => void;
  leftList: Customer[];
  rightList: Customer[];
}

const useStyles = createStyles(({ css, token }) => ({
  modalBody: css`
    border-radius: 8px;
    background: ${token.colorFillSecondary};
    padding: 24px;
    height: 500px;
    display: flex;
    flex-direction: column;
  `,
  title: css`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 24px;
    color: ${token.colorText};
  `,
  mainContainer: css`
    display: flex;
    flex: 1;
    min-height: 0;
  `,
  leftPanel: css`
    width: 220px;
    display: flex;
    flex-direction: column;
    margin-right: 24px;
    min-height: 0;
  `,
  rightPanel: css`
    width: 320px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  `,
  panelContainer: css`
    background: ${token.colorBgContainer};
    flex: 1;
    border-radius: 6px;
    overflow: auto;
    border: 1px solid ${token.colorBorder};
    display: flex;
    flex-direction: column;
    min-height: 0;
  `,
  panelHeader: css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${token.colorBorder};
    padding: 0 12px;
    height: 40px;
    font-weight: 500;
    flex-shrink: 0;
  `,
  panelContent: css`
    flex: 1;
    overflow: auto;
  `,
  customerItem: css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${token.colorBorder};
    padding: 0 12px;
    height: 40px;
  `,
  arrowContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 60px;
  `,
  arrowButton: css`
    width: 36px;
    height: 36px;
    border: 1px solid ${token.colorBorderSecondary};
    background: ${token.colorBgContainer};
    color: ${token.colorText};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  footer: css`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  `,
  cancelButton: css`
    background: ${token.colorBgContainer};
    color: ${token.colorText};
    border: 1px solid ${token.colorBorderSecondary};
  `,
  saveButton: css`
    background: ${token.colorText};
    color: ${token.colorBgContainer};
    border: none;
  `,
  panelTitle: css`
    font-weight: 500;
    margin-bottom: 8px;
    height: 24px;
    flex-shrink: 0;
    color: ${token.colorText};
  `,
}));

const EmployeeCustomerModal: React.FC<EmployeeCustomerModalProps> = ({
  open,
  onClose,
  employee,
  sessionList,
  employeeCustomers,
  onSave,
  loading,
  customerTab,
  setCustomerTab,
  selectedLeft,
  setSelectedLeft,
  selectedRight,
  setSelectedRight,
  moveToRight,
  moveToLeft,
  leftList,
  rightList,
}) => {
  const { styles } = useStyles();
  return (
    <Modal
      title={null}
      open={open}
      footer={null}
      onCancel={onClose}
      width={680}
      style={{ top: 60 }}
      classNames={{
        body: styles.modalBody
      }}
      closable={false}
    >
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          <div className={styles.title}>员工对接客户管理</div>
          <div className={styles.mainContainer}>
            {/* 左侧 */}
            <div className={styles.leftPanel}>
              <Tabs
                activeKey={customerTab}
                onChange={setCustomerTab}
                items={[
                  { key: "all", label: "全部客户" },
                  { key: "unassigned", label: "未分配客户" },
                ]}
                style={{ marginBottom: 8 }}
              />
              <div className={styles.panelContainer}>
                {/* 标题栏 */}
                <div className={styles.panelHeader}>
                  <Checkbox
                    checked={
                      selectedLeft.length === leftList.length &&
                      leftList.length > 0
                    }
                    indeterminate={
                      selectedLeft.length > 0 &&
                      selectedLeft.length < leftList.length
                    }
                    onChange={(e) =>
                      setSelectedLeft(
                        e.target.checked ? leftList.map((c) => c.id) : []
                      )
                    }
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ flex: 1 }}>客户名称</span>
                  <span style={{ width: 60 }}>对接人</span>
                </div>
                {/* 客户项 */}
                <div className={styles.panelContent}>
                  {leftList.map((c) => (
                    <div key={c.id} className={styles.customerItem}>
                      <Checkbox
                        checked={selectedLeft.includes(c.id)}
                        onChange={(e) => {
                          setSelectedLeft(
                            e.target.checked
                              ? [...selectedLeft, c.id]
                              : selectedLeft.filter((id) => id !== c.id)
                          );
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ flex: 1 }}>{c.customerName}</span>
                      <span style={{ width: 60 }}>{c.employeeName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 中间双箭头 */}
            <div className={styles.arrowContainer}>
              <Button
                className={styles.arrowButton}
                icon={<DoubleRightOutlined />}
                disabled={selectedLeft.length === 0}
                onClick={moveToRight}
              />
              <Button
                className={styles.arrowButton}
                icon={<DoubleLeftOutlined />}
                disabled={selectedRight.length === 0}
                onClick={moveToLeft}
              />
            </div>
            {/* 右侧 */}
            <div className={styles.rightPanel}>
              <div className={styles.panelTitle}>员工客户</div>
              <div className={styles.panelContainer}>
                {/* 标题栏 */}
                <div className={styles.panelHeader}>
                  <Checkbox
                    checked={
                      selectedRight.length === rightList.length &&
                      rightList.length > 0
                    }
                    indeterminate={
                      selectedRight.length > 0 &&
                      selectedRight.length < rightList.length
                    }
                    onChange={(e) =>
                      setSelectedRight(
                        e.target.checked ? rightList.map((c) => c.id) : []
                      )
                    }
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ flex: 1 }}>客户名称</span>
                </div>
                {/* 客户项 */}
                <div className={styles.panelContent}>
                  {rightList.map((c) => (
                    <div key={c.id} className={styles.customerItem}>
                      <Checkbox
                        checked={selectedRight.includes(c.id)}
                        onChange={(e) => {
                          setSelectedRight(
                            e.target.checked
                              ? [...selectedRight, c.id]
                              : selectedRight.filter((id) => id !== c.id)
                          );
                        }}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ flex: 1 }}>{c.customerName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 底部按钮 */}
          <div className={styles.footer}>
            <Button className={styles.cancelButton} onClick={onClose}>
              取消
            </Button>
            <Button
              className={styles.saveButton}
              loading={loading}
              onClick={onSave}
            >
              保存
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default EmployeeCustomerModal;
