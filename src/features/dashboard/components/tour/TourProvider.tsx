'use client'

import { TourCard } from './TourCard'
import { useTour } from '../../hooks/useTour'
import { TourPosition } from '../../data/tourSteps'

const positionClasses: Record<TourPosition, string> = {
    'step-1': 'top-20 -right-32 -translate-x-1/2 md:bottom-8 md:right-8 md:top-auto md:translate-x-0',
    'step-2': 'bottom-15 right-4 md:bottom-8 md:right-8',
    'step-3': 'top-30 left-5 md:left-60',
    'step-4': 'top-40 left-5 md:left-50 md:top-120 lg:top-120 lg:left-150 lg:bottom-50',
}

export function TourProvider() {
    const { currentStep, currentStepIndex, isVisible, next, skip, totalSteps } = useTour()

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">

            {/* Backdrop - blocks page interaction */}
            <div className='absolute inset-0 pointer-events-auto bg-black/10' />

            <div className={`absolute pointer-events-auto ${positionClasses[currentStep.position]}`}>
                <TourCard
                    step={currentStep}
                    currentIndex={currentStepIndex}
                    totalSteps={totalSteps}
                    onNext={next}
                    onSkip={skip}
                />
            </div>
        </div>
    )
}