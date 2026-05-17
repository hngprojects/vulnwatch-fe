export type ArrowDirection = 'left' | 'top'
export type TourPosition = 'step-1' | 'step-2' | 'step-3' | 'step-4'

export interface TourStep {
    id: number
    label: string
    title: string
    description: string
    position: TourPosition
    arrow: ArrowDirection
    mobileArrow: ArrowDirection
    buttonLabel: 'continue' | 'done'
}

export const tourSteps: TourStep[] = [
    // step 1
    {
        id: 1,
        label: 'TOUR 1 OF 4 - WELCOME',
        title: 'Three steps to full security visibility',
        description: 'These four cards are your live health snapshot score, active domains, open issues, and critical alerts update every time a scan runs.',
        position: 'step-1',
        arrow: 'left',
        mobileArrow: 'left',
        buttonLabel: 'continue',
    },
    // step 2
    {
        id: 2,
        label: 'TOUR 2 OF 4 - HOW IT WORKS',
        title: 'Three steps to full security visibility',
        description: 'First verify you own the domain, then we run a passive non-intrusive scan, and finally the AI turns the results into plain-English actions you can act on immediately.',
        position: 'step-2',
        arrow: 'left',
        mobileArrow: 'left',
        buttonLabel: 'continue',
    },
    // step 3
    {
        id: 3,
        label: 'TOUR 3 OF 4 - NAVIGATION',
        title: 'Your five core sections',
        description: 'Dashboard gives you the overview. Domains manages your verified sites. Scans shows run history. Reports holds AI summaries. Settings controls your account and alerts.',
        position: 'step-3',
        arrow: 'left',
        mobileArrow: 'left',
        buttonLabel: 'continue',
    },
    // step 4
    {
        id: 4,
        label: 'TOUR 4 OF 4 - RESOURCES',
        title: 'Your docs and API keys live here',
        description: 'Security Docs walks you through every finding type and remediation guide. API Access gives you your key to integrate VulnWatch scan results into your own pipelines and tools.',
        position: 'step-4',
        arrow: 'top',
        mobileArrow: 'left',
        buttonLabel: 'done',
    },
]