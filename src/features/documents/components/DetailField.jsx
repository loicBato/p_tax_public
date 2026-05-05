import React from 'react';
import { cn } from '../../../lib/utils';

export function DetailField({ label, value, color = "text-text-title" }) {
    return (
        <div className="space-y-2 px-4 md:px-8 border-l-2 border-primary/20 transition-all hover:border-primary">
            <p className="text-xs text-text-secondary leading-none">{label}</p>
            <p className={cn("text-sm md:text-base font-semibold tracking-tight leading-tight", color)}>{value}</p>
        </div>
    );
}
