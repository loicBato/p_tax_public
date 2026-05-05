import React from 'react';
import { FiCheckCircle as CheckCircle2, FiClock as Clock, FiAlertCircle as AlertCircle } from 'react-icons/fi';

export const getStatusColor = (status) => {
    switch (status) {
        case 'PAYE': return 'text-success border-success/30 bg-success/5';
        case 'IMPAYE': return 'text-error border-error/30 bg-error/5';
        case 'EN_ATTENTE': return 'text-warning border-warning/30 bg-warning/5';
        default: return 'text-text-secondary border-divider bg-app-bg';
    }
};

export const getStatusIcon = (status) => {
    switch (status) {
        case 'PAYE': return <CheckCircle2 className="w-3 h-3" />;
        case 'IMPAYE': return <AlertCircle className="w-3 h-3" />;
        case 'EN_ATTENTE': return <Clock className="w-3 h-3" />;
        default: return <Clock className="w-3 h-3" />;
    }
};
