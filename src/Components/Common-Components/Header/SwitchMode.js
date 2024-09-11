import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import modeSwitchContext from '../../../Store/modeSwitchContext';

export default function SwitchMode(){
    const modeSwitchctx = useContext(modeSwitchContext);
    return(
        <Switch 
        checked={modeSwitchctx.darkMode}
        onChange={modeSwitchctx.ontoggleDarkMode}
        inputProps={{ 'aria-label': 'controlled' }}
        />
    )
}