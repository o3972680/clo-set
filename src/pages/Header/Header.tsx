import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
    const [current, setCurrent] = useState<string>("store");

    const handleMenuClick = (e: { key: string }) => {
        setCurrent(e.key);
    };

    const menuItems: MenuProps["items"] = [
        {
            key: "store",
            label: "STORE",
        },
        {
            key: "gallery",
            label: "GALLERY",
            disabled: true,
        },
        {
            key: "contest",
            label: "CONTEST",
            disabled: true,
        },
        {
            key: "community",
            label: "COMMUNITY",
            disabled: true,
        },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img
                        src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
                        alt="CONNET Logo"
                        className={styles.logo}
                    />
                </div>

                <div className={styles.menuContainer}>
                    <Menu
                        mode="horizontal"
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                        items={menuItems}
                        className={styles.menu}
                    />
                </div>

                <div className={styles.authContainer}>
                    <Button
                        variant="text"
                        color="default"
                        className={styles.signinButton}
                        size="small"
                    >
                        SIGN IN
                    </Button>
                    <Button
                        color="default"
                        variant="outlined"
                        className={styles.signupButton}
                        size="small"
                    >
                        SIGN UP
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
