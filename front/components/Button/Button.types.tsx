interface PanelButtonProps {
    title: string; 
    style?: object; 
    onPress?: () => void;
    }

interface HorizontalButtonsProps {
    [x: string]: any;
    buttonList: string[];
}