import { useState } from 'react'
import styled from 'styled-components'

import { withGenericSuspense } from '@/src/components/helpers/SafeSuspense'
import { Tabs as BaseTabs, Tab } from '@/src/components/tabs/Tabs'
import { InterestRateMode } from '@/src/hooks/presentation/useUserBorrows'
import { BorrowInfo } from '@/src/pagePartials/markets/BorrowInfo'
import { RepayInfo } from '@/src/pagePartials/markets/RepayInfo'
import { Borrow } from '@/src/pagePartials/markets/borrow/Borrow'
import { Repay } from '@/src/pagePartials/markets/repay/Repay'
import { BorrowRepayTabs } from '@/types/modal'
import { Token } from '@/types/token'

const Tabs = styled(BaseTabs)`
  margin: 32px auto;
`

interface Props {
  activeTab?: BorrowRepayTabs
  interestRateMode: InterestRateMode
  onInterestRateSelect: (mode: InterestRateMode) => void
  onTokenSelect: (token: Token) => void
  token: Token | null
}

const BorrowRepayBase: React.FC<Props> = ({
  activeTab,
  interestRateMode,
  onInterestRateSelect,
  onTokenSelect,
  token,
}) => {
  const [tab, setTab] = useState<BorrowRepayTabs>(activeTab || 'borrow')
  const borrowActive = tab === 'borrow'
  const repayActive = tab === 'repay'

  return token ? (
    <>
      {borrowActive && <BorrowInfo token={token} />}
      {repayActive && <RepayInfo token={token} />}
      <Tabs>
        <Tab isActive={tab === 'borrow'} onClick={() => setTab('borrow')}>
          Borrow
        </Tab>
        <Tab isActive={tab === 'repay'} onClick={() => setTab('repay')}>
          Repay
        </Tab>
      </Tabs>
      {borrowActive && (
        <Borrow
          interestRateMode={interestRateMode}
          onInterestRateSelect={onInterestRateSelect}
          onTokenSelect={onTokenSelect}
          tokenAddress={token.address}
        />
      )}
      {repayActive && (
        <Repay
          interestRateMode={interestRateMode}
          onInterestRateSelect={onInterestRateSelect}
          onTokenSelect={onTokenSelect}
          tokenAddress={token.address}
        />
      )}
    </>
  ) : null
}

export const BorrowRepay = withGenericSuspense(BorrowRepayBase)
