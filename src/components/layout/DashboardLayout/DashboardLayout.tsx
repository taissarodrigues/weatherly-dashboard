import React from "react";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
  header: React.ReactNode;
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header,
  mainContent,
  sidebarContent,
}) => {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.headerArea}>
        {header}
      </header>
      
      <div className={styles.gridContainer}>
        <main className={styles.mainArea}>
          {mainContent}
        </main>
        
        <aside className={styles.sidebarArea}>
          {sidebarContent}
        </aside>
      </div>
    </div>
  );
};