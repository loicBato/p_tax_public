import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import Armoiries from "../../assets/Armoiries.png";
import { formatPhoneNumber } from '../../../utils/fonctions';
import { FaCheckSquare } from 'react-icons/fa';

moment.locale('fr');

/**
 * Template du Récépissé — composant React avec Tailwind CSS
 * Reproduit fidèlement le ReceiptPdf MUI en Tailwind
 */
export function ReceiptTemplate({ doc }) {
    const isVehicleWithdrawn = doc.withdrawnDocs?.vehicle || false;
    const title = isVehicleWithdrawn
        ? "Récépissé d'immobilisation d'engin"
        : "Récépissé de retrait de pièces";

    const raw = doc._raw || {};
    const dateFormatted = moment(doc.date).format('DD/MM/YYYY HH:mm:ss');
    const postOfficeName = doc.issuer || 'Commissariat Central de Lomé';

    // Infos engin
    const plate = doc.plateNumber || '';
    const chassis = doc.chassis || doc._raw?.vin || '';
    const offenderName = doc.citizenName || doc.ownerName || '—';
    const offenderPhone = doc.offenderPhone || doc.ownerPhone || '—';

    // Motifs
    const motifs = doc.motifs || [];

    // Agent
    const agentId = doc.agentId || raw.agent?.agent_id || '—';

    const fontSans = "Arial, Helvetica, sans-serif";

    return (
        <div
            id="receipt-pdf"
            className="w-[794px] min-h-[1123px] bg-[#ffffff] flex flex-col px-15 py-8"
            style={{ color: '#000', fontFamily: fontSans }}
        >
            {/* ═══ EN-TÊTE ═══ */}
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

            {/* ═══ CONTENU PRINCIPAL ═══ */}
            <div className="flex flex-col mt-4 flex-grow space-y-2">

                {/* TITRE */}
                <div className="text-center space-y-1 mb-6">
                    <h1 className="text-[15px] font-bold m-0 uppercase">
                        {title}
                    </h1>
                    <h2 className="text-[14px] font-bold m-0">
                        {doc.reference}
                    </h2>
                </div>

                {/* ═══ SECTION ENGIN ═══ */}
                <SectionDivider label="ENGIN" />
                <div className="space-y-0 px-0">
                    <LabelValue label={plate ? "IMMATRICULATION" : "CHASSIS"} value={plate || chassis} bold />
                    <LabelValue label="PROPRIETAIRE / CONDUCTEUR" value={offenderName} bold />
                    <LabelValue label="CONTACT" value={formatPhoneNumber(offenderPhone)} bold />
                </div>

                {/* ═══ SECTION MOTIFS ═══ */}
                <SectionDivider label="MOTIFS" />
                <div className="px-6 my-1">
                    <ul className="list-disc list-inside space-y-1">
                        {motifs.length > 0 ? motifs.map((item, i) => (
                            <li key={i} className="text-[14px]">
                                {item}
                            </li>
                        )) : (
                            <li className="text-[14px]">Aucun motif spécifié</li>
                        )}
                    </ul>
                </div>

                {/* ═══ SECTION SITUATION ═══ */}
                <SectionDivider label="SITUATION" />
                <div className="space-y-0 px-0">
                    <LabelValue label="DATE" value={dateFormatted} bold />
                    <LabelValue label="INTERVENANT" value={agentId} bold />
                    <LabelValue label="POSTE DE GARDE" value={postOfficeName} bold />
                </div>

                {/* ═══ SECTION PIÈCES RETIRÉES ═══ */}
                {!isVehicleWithdrawn && (
                    <>
                        <SectionDivider label="PIÈCES RETIRÉES" />
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 px-2 my-1">
                            <PieceCheckbox label="Permis de Conduire" taken={doc.withdrawnDocs?.pc} />
                            <PieceCheckbox label="Carte Grise" taken={doc.withdrawnDocs?.cg} />
                            <PieceCheckbox label="Visite Technique" taken={doc.withdrawnDocs?.vt} />
                            <PieceCheckbox label="Assurance" taken={doc.withdrawnDocs?.insurance} />
                            <PieceCheckbox label="Carte Bleue Taxi" taken={doc.withdrawnDocs?.cbtaxi} />
                            <PieceCheckbox label="Laissé Passé" taken={doc.withdrawnDocs?.lp} />
                            <PieceCheckbox label="CNI" taken={doc.withdrawnDocs?.cni} />
                        </div>
                    </>
                )}

                {/* ═══ CONDITIONS DE RESTITUTION ═══ */}
                <div className="pt-4 mt-10">
                    <div className="border border-[#000000] p-3 rounded-lg">
                        <div className="text-[13px] text-justify leading-relaxed">
                            <span className="font-bold">Conditions de restitution :</span><br />
                            Le contrevenant reconnaît avoir commis les infractions constatées
                            et avoir été dûment informé que le paiement de l'amende forfaitaire n'arrête les poursuites judiciaires
                            que sous les réserves expressément stipulées par la loi. En cas de contestation,
                            le contrevenant dispose du droit de former opposition devant le tribunal compétent dans les délais légaux.
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ PIED DE PAGE ═══ */}
            <div className="border-t-[1px] border-[#000000] pt-1 flex justify-between">
                <div className="text-[10px] flex flex-col gap-1">
                    <span>(1) - Gendarmerie Nationale</span>
                    <span>- Police Nationale</span>
                    <span>- Autres</span>
                </div>
                <div className="text-[10px]">
                    {doc.status === 'PAYE' ? `N° ${doc.reference || ''}` : ''}
                    REPUBLIQUE TOGOLAISE
                </div>
            </div>
        </div>
    );
}

// ── Composants internes ──

/** Séparateur de section avec label centré (reproduit le Divider MUI avec children) */
function SectionDivider({ label }) {
    return (
        <div className="flex items-center gap-3 my-2">
            <div className="flex-1 border-t border-[#000000]"></div>
            <span className="text-[13px] font-semibold shrink-0 m-0">{label}</span>
            <div className="flex-1 border-t border-[#000000]"></div>
        </div>
    );
}

/** Ligne Label : Valeur (reproduit le LabelValue MUI) */
function LabelValue({ label, value, bold = false }) {
    return (
        <div className="flex items-baseline justify-between gap-2 py-0.5">
            <span className="text-[12px] min-w-[200px] shrink-0">{label} :</span>
            <span className={`text-[13px] ${bold ? 'font-semibold' : ''}`}>{value || '—'}</span>
        </div>
    );
}

/** Checkbox pièce retirée (reproduit le PieceWithDrawn MUI) */
function PieceCheckbox({ label, taken }) {
    if (!taken) return null;
    return (
        <div className="flex items-center gap-2">
            <FaCheckSquare />
            <span className="text-[13px] m-">{label}</span>
        </div>
    );
}
