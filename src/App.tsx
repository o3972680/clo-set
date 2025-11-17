import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import styles from "./App.module.scss";
import { useStoreStore } from "./store";
import Products from "@/pages/Products";
import Header from "@/pages/Header";

function App() {
    const { darkAlgorithm } = theme;
    const { items, fetchInitialItems } = useStoreStore();

    useEffect(() => {
        if (items.length === 0) {
            fetchInitialItems();
        }
    }, [fetchInitialItems, items.length]);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
                token: {
                    colorBgBase: "#121212",
                    colorTextBase: "rgba(255, 255, 255, 1)",
                    colorPrimaryBorderHover: "#66F0FF",
                },
                components: {
                    Input: {
                        activeBorderColor: "#66F0FF",
                        hoverBorderColor: "#66F0FF",
                    },
                    Button: {
                        defaultHoverBorderColor: "#66F0FF",
                        defaultHoverColor: "#66F0FF",
                        defaultColor: "#ffffff",
                    },
                    Checkbox: {
                        colorPrimary: "#66F0FF",
                        colorPrimaryHover: "#66F0FF",
                        colorPrimaryActive: "#66F0FF",
                    },
                    Slider: {
                        colorBorder: "#66F0FF",
                        handleActiveColor: "#66F0FF",
                    },
                    Menu: {
                        colorBorder: "#66F0FF",
                        darkItemSelectedBg: "#66F0FF",
                        horizontalItemHoverColor: "#66F0FF",
                        horizontalItemSelectedColor: "#66F0FF",
                    },
                },
            }}
        >
            <div className={styles.app}>
                <Header />
                <main className={styles.mainContent}>
                    <div className={styles.storeTitle}>
                        <h1>Share your ideas.</h1>
                        <h1>Empower your design.</h1>
                    </div>

                    <Products />
                </main>
            </div>
        </ConfigProvider>
    );
}

export default App;
