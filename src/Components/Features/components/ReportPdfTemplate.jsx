import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import Armoiries from "../../assets/Armoiries.png";
import { ToWords } from 'to-words';
import { formatAmount, formatPhoneNumber } from '../../../utils/fonctions';

moment.locale('fr');


const toWords = new ToWords({
    localeCode: 'fr-FR',
    converterOptions: {
        currency: false,
        ignoreDecimal: true,
    }
});

function NumberToLetter(amount) {
    if (!amount) return "";

    const number = Number(amount);

    if (isNaN(number)) return "";

    return toWords.convert(number);
}

/**
 * Template du Procès-Verbal — composant React avec Tailwind CSS
 */
export function ReportPdfTemplate({ receipt }) {
    const isPaid = receipt.status === 'PAYE';

    // Fallbacks
    const dateObj = receipt.date ? moment(receipt.date) : moment();
    const formattedDate = dateObj.format("DD/MM/YYYY");
    const heure = dateObj.format("HH");
    const minute = dateObj.format("mm");

    const postOfficeName = receipt.issuer || 'Commissariat Central de Lomé';
    const offenderName = receipt.citizenName || receipt.ownerName || '—';
    const offenderPhone = receipt.offenderPhone || '—';
    const plate = receipt.plateNumber || '—';
    const description = receipt.description || '—';

    // Penalties/Items
    const items = receipt.motifs || [];

    // Total amount
    const totalAmount = receipt.amount
        || receipt.amount_paid
        || receipt.fine_amount
        || 0;

    const fontSans = "Arial, Helvetica, sans-serif";

    return (
        <div
            id="pdf-content"
            className="w-[794px] min-h-[1123px] bg-[#ffffff] flex flex-col px-15 py-8"
            style={{ color: '#000', fontFamily: fontSans }}
        >
            {/* EN-TÊTE */}
            <div className="flex justify-between items-start pb-2 gap-5">
                {/* Gauche : Ministères */}
                <div className="flex flex-col items-center space-y-2 w-[220px]">
                    <div className="text-center text-[11px] leading-tight my-1">
                        MINISTERE DES INFRASTRUCTURES ET DES TRANSPORTS
                    </div>
                    <div className="w-[150px] border-t border-dashed border-[#000000] my-1 mb-0"></div>
                    <div className="text-center text-[11px] leading-tight my-1">
                        DIRECTION GENERALE DU TRESOR ET DE LA COMPTABILITE PUBLIQUE
                    </div>
                    <div className="w-[150px] border-t border-dashed border-[#000000] my-1 mb-0"></div>
                    <div className="text-center text-[11px] leading-tight my-1">
                        MINISTERE DE LA SECURITÉ ET DE LA PROTECTION CIVILE
                    </div>
                </div>

                {/* Centre : Logo */}
                <div className="flex justify-center items-center">
                    <img src={Armoiries} alt="Armoiries" className="object-contain h-[100px]"
                        onError={(e) => { e.target.style.display = 'none'; }} />
                </div>

                {/* Droite : République Togolaise */}
                <div className="flex flex-col items-center space-y-2 w-[220px]">
                    <div className="text-center text-[11px] leading-tight uppercase my-1">
                        REPUBLIQUE TOGOLAISE
                    </div>
                    <div className="text-center text-[10px] uppercase my-1">
                        TRAVAIL-LIBERTE-PATRIE
                    </div>
                    <div className="w-[120px] border-t border-dashed border-[#000000] my-1"></div>
                    <div className="text-center text-[11px] uppercase my-1">
                        Prefecture du GOLFE
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-6 flex-grow space-y-2">
                {/* TITRE */}
                <div className="text-center space-y-1 mb-6">
                    <h1 className="text-[15px] font-bold m-0 uppercase">
                        PROCES-VERBAL
                    </h1>
                    <h2 className="text-[13px] font-bold m-0 uppercase">
                        CONTRAVENTION DE SIMPLE POLICE - AMENDE FORFAITAIRE
                    </h2>
                </div>

                {/* INFOS SERVICE */}
                <div className="flex flex-col space-y-1 mb-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[14px]">Service verbalisateur :</span>
                        <span className="text-[14px]">DSR TOGO</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[14px]">Poste de Police :</span>
                        <span className="text-[14px]">{postOfficeName}</span>
                    </div>
                </div>

                {/* TEXTE PV */}
                <div className="text-[14px] leading-relaxed text-justify my-1">
                    Le <span className="font-bold">{formattedDate}</span> à <span className="font-bold">{heure} heure {minute}</span>, nous soussignés, agent de la DSR Maritime-Togo, posté à Lomé, avons constaté ce qui suit.
                </div>

                <div className="text-[14px] leading-relaxed text-justify">
                    Monsieur (Madame) <span className="font-bold">{offenderName}</span>, tél: <span className="font-bold">{formatPhoneNumber(offenderPhone)}</span>, conduisant un véhicule de plaque <span className="font-bold">{plate}</span>, <span className="font-bold">{description}</span> a commis les infractions ci-après:
                </div>

                {/* LISTE DES FACTURES / PENALITÉS */}
                <div className="px-10 my-1">
                    <ul className="list-inside space-y-2">
                        {items.length > 0 ? items.map((item, i) => (
                            <li key={i} className="text-[14px]">
                                . {item}
                            </li>
                        )) : (
                            <li className="text-[14px]">Aucune infraction spécifiée</li>
                        )}
                    </ul>
                </div>

                {/* MONTANT FORFAITAIRE */}
                <div className="bg-[#e5e7eb] p-4 pt-1 mt-4">
                    <div className="text-[14px] leading-relaxed text-justify m-0 py-0">
                        En conséquence des infractions constatées, il lui a été fait verser une amende forfaitaire d'un montant de
                        <span className="font-bold"> {NumberToLetter(totalAmount)} Francs CFA ({formatAmount(totalAmount)})</span>,
                        conformément au barème des amendes de simple police applicable en République Togolaise.
                    </div>
                </div>

                <div className="border-t border-[#d1d5db] my-1"></div>

                {/* DECLARATION CONTREVENANT */}
                <div className="text-[12px] text-justify leading-relaxed">
                    <span className="font-bold">Déclaration du contrevenant :</span><br />
                    Le contrevenant reconnaît avoir commis les infractions constatées
                    et avoir été dûment informé que le paiement de l'amende forfaitaire n'arrête les poursuites judiciaires
                    que sous les réserves expressément stipulées par la loi. En cas de contestation,
                    le contrevenant dispose du droit de former opposition devant le tribunal compétent dans les délais légaux.
                </div>

                {/* SIGNATURES */}
                <div className="flex justify-between px-10 pt-10 pb-4">
                    <div>
                        <div className="text-[13px] border-b border-[#000000] pb-28 text-center">
                            Signature du verbalisateur
                        </div>
                    </div>
                    <div>
                        <div className="text-[13px] border-b border-[#000000] pb-28 text-center">
                            Signature du contrevenant
                        </div>
                    </div>
                </div>
            </div>

            {/* PIED DE PAGE */}
            <div className="border-t-[1px] border-[#000000] pt-1 flex justify-between">
                <div className="text-[10px] flex flex-col gap-1">
                    <span>(1) - Gendarmerie Nationale</span>
                    <span>- Police Nationale</span>
                    <span>- Autres</span>
                </div>
                <div className="text-[10px]">
                    {isPaid ? `N° ${receipt.reference || receipt.paymentId || ""} ` : ''}
                    REPUBLIQUE TOGOLAISE
                </div>
            </div>
        </div>
    );
}
