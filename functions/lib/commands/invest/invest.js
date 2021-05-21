'use strict'
// ! MML Components for `/invest` command
Object.defineProperty(exports, '__esModule', { value: true })
exports.confirmFormMML = exports.investFormMML = void 0
const investFormMML = (investMode, asset) => {
  return `
        <mml name="invest_form">
            <text>
            something like hey you want to buy {shortName}?
            if > threshold {
                this many other people are also looking at tsla right now
            }
            </text>
            <row>
                <column width="2">Ticker:</column>
                <column width="10">
                    <input type="text" name="asset_name" value="${asset}" />
                </column>
            </row>
        </mml>`
}
exports.investFormMML = investFormMML
const confirmFormMML = (description, reportedBy) => {
  return `
        <mml>
            <text>ticket created about "${description}" by ${reportedBy}</text>
        </mml>`
}
exports.confirmFormMML = confirmFormMML
//# sourceMappingURL=invest.js.map
