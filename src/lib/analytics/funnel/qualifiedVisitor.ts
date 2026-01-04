import { sendEvent } from '../proxy/sendEvent';

export const evaluateQualifiedVisitor = (signals: number) => {
    // Simple scoring logic
    if (signals >= 2) {
        sendEvent('qualified_visitor', {
            confidence: 'high',
            score: signals
        });
    }
};
