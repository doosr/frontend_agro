import React, { useState } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import reminderService from '../services/reminderService';
import { toast } from 'react-toastify';

const SnoozeButton = ({ alertId, onSnooze }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(false);

    const snoozeDurations = reminderService.getSnoozeDurations();

    const handleSnooze = async (duration) => {
        try {
            setLoading(true);
            const response = await reminderService.snoozeAlert(alertId, duration);

            if (response.success) {
                const durationLabel = snoozeDurations.find(d => d.value === duration)?.label || duration + ' min';
                toast.success(`⏰ Rappel programmé dans ${durationLabel}`);
                setShowOptions(false);
                onSnooze?.();
            }
        } catch (error) {
            toast.error('Erreur lors de la programmation du rappel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setShowOptions(!showOptions)}
                disabled={loading}
                className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
                <Clock className="h-3 w-3" />
                <span>Reporter</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
            </button>

            {showOptions && (
                <>
                    {/* Overlay pour fermer le menu */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowOptions(false)}
                    />

                    {/* Menu déroulant */}
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <div className="py-1">
                            {snoozeDurations.map((duration) => (
                                <button
                                    key={duration.value}
                                    onClick={() => handleSnooze(duration.value)}
                                    disabled={loading}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-3 w-3" />
                                        <span>{duration.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SnoozeButton;
