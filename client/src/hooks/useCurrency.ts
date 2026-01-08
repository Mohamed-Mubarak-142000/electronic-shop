import { useConfigStore } from '@/store/useConfigStore';

export const useCurrency = () => {
    const { configs } = useConfigStore();
    const currencyCode = configs.currency || 'USD';

    const getSymbol = () => {
        switch(currencyCode) {
            case 'USD': return '$';
            case 'EGP': return 'جنيه ';
            case 'AED': return 'AED ';
            default: return currencyCode + ' ';
        }
    };

    const formatPrice = (price: number) => {
        const symbol = getSymbol();
        return `${symbol}${Number(price).toFixed(2)}`;
    };

    return { 
        currencyCode, 
        symbol: getSymbol(), 
        formatPrice 
    };
};
