export interface IReceiptWebhookPayload {
    cpnId: number
    resource: string
    resourceId: string
    topic: string
    action: string
    officeId: number
}

export interface IDocumentData {
    href: string
    id: number
    emmissionDate: number
    expirationDate: number
    generationDate: number
    rcofDate: number
    number: number
    totalAmount: number
    netAmount: number
    taxAmount: number
    exemptAmount: number
    exportTotalAmount: number
    exportNetAmount: number
    exportTaxAmount: number
    exportExemptAmount: number
    commissionRate: number
    commissionNetAmount: number
    commissionTaxAmount: number
    commissionTotalAmount: number
    percentageTaxWithheld: number
    purchaseTaxAmount: number
    purchaseTotalAmount: number
    urlTimbre: string | null
    ted: string | null
    urlPublicView: string
    urlPdf: string
    urlPublicViewOriginal: string
    urlPdfOriginal: string
    token: string
    state: number
    userId: number
    urlXml: string | null
    address: string | null
    municipality: string | null
    city: string | null
    informedSii: number
    responseMsgSii: string | null
    document_type: {
        href: string
        id: string
    }
    client: {
        href: string
        id: string
    }
    office: {
        href: string
        id: string
    }
    user: {
        href: string
        id: string
    }
    references: {
        href: string
    }
    document_taxes: {
        href: string
    }
    details: {
        href: string
    }
    sellers: {
        href: string
    }
}