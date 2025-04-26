interface PanelButtonProps {
    title: string; 
    style?: object; 
    onPress?: () => void;
    selected?: boolean;
    }

interface HorizontalButtonsProps {
    [x: string]: any;
    buttonList: string[];
}