import React, { useState, useEffect } from 'react';

import { useAppSelector } from '@/app/redux/hooks';
import { configPaths } from '@/app/redux/configSlice'
import { updateNestedEditingProfile } from '@/app/redux/configActions';
import { formatCurrency, supportedCurrencies } from '@/utils/granularity'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    ListItemText,
    Checkbox,
    Input,
    ListSubheader
} from '@mui/material';

// initializing a state for each of the two props that we are using.
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const returnCurrencyMenuItems = (currencyArray: typeof supportedCurrencies) => {
    const usd: (typeof supportedCurrencies.USD)[] = [];
    const crypto: (typeof supportedCurrencies.USD)[] = [];

    for (const currency in currencyArray) {
        let tempCurrency = currencyArray[currency as keyof typeof supportedCurrencies]
        if (tempCurrency.type === 'usd') {
            usd.push(tempCurrency)
        } else {
            crypto.push(tempCurrency)
        }
    }

    return {
        usd,
        crypto
    }

}

const CurrencySelector = () => {

    const profile = useAppSelector(state => state.config.editingProfile);
    const [currency, updateCurrency] = useState<(keyof typeof supportedCurrencies)[]>([])
    useEffect(() => {
        if (profile.general.defaultCurrency) updateCurrency(profile.general.defaultCurrency)
    }, [profile])

    const { usd, crypto } = returnCurrencyMenuItems(supportedCurrencies)
    const usdNames = usd.map(c => c.value)
    const onChange = (e: any) => {
        if (e.target.value.some((cur: string) => !Object.keys(supportedCurrencies).includes(cur))) {
            console.error('No matching currency code found.')
            return false
        }

        const isUSD = e.target.value.some((r:string)=> usdNames.includes(r))
        if(isUSD){
            const isAllUsd = e.target.value.every((v:string) => usdNames.includes(v));
            if(!isAllUsd) {
                updateCurrency([])
                updateNestedEditingProfile([], configPaths.general.defaultCurrency)
                return alert('Warning. You cannot mix currencies that are not USD based.')
            }
            updateCurrency([...e.target.value])
            updateNestedEditingProfile([...e.target.value], configPaths.general.defaultCurrency)
            return
        }

        // selecting only the last value so there are not multiple crypto currencies selected at a time.
        const selected = (e.target.value.length > 1) ? [e.target.value.pop()] : [...e.target.value];
        updateCurrency(selected)
        updateNestedEditingProfile(selected, configPaths.general.defaultCurrency)
    }


    return (
        <FormControl style={{ width: '100%', marginBottom: '25px' }} fullWidth>
            <InputLabel id="currency-label">Stat / Metric Currency</InputLabel>
            <Select
                labelId="currency-label"
                multiple
                id="currency"
                name="currency"
                label="Stat / Metric Currency"
                value={currency}
                onChange={onChange}
                renderValue={() => (currency.length > 0) ? currency.join(', ') : ""}
                style={{
                    marginRight: '15px',
                    width: '100%'
                }}
            >
                < ListSubheader > USD</ListSubheader>


                {usd.map(c => {
                    return (
                        <MenuItem value={c.value} key={c.value}>
                            <Checkbox checked={currency.indexOf(c.value as keyof typeof supportedCurrencies) > - 1} />
                            <ListItemText primary={c.value + ` (${c.name})`} />
                        </MenuItem>
                    )
                })}
                
                <ListSubheader>Crypto</ListSubheader>
                {crypto.map(c => {
                    return (
                        <MenuItem value={c.value} key={c.value} style={{height: '54px'}}>
                            <ListItemText primary={c.value + ` (${c.name})`} />
                        </MenuItem>
                    )
                })}






            </Select>
        </FormControl >
    )

}

export default CurrencySelector