/**
 * Jeux de cartes de nomenclature — photos libres (Wikimedia Commons).
 * Règle produit : **exactement 12** photos par set.
 * Dossier : public/nomenclature/<set>/ + CREDITS.md obligatoire.
 */
import type { NomenclaturePhoto } from "@/components/worksheets/nomenclature-cards"

export const NOMENCLATURE_ANIMAUX: readonly NomenclaturePhoto[] = [
  { word: "le renard", src: "/nomenclature/animaux/renard.jpg", alt: "Photo d'un renard" },
  { word: "le hibou", src: "/nomenclature/animaux/hibou.jpg", alt: "Photo d'un hibou" },
  { word: "l'écureuil", src: "/nomenclature/animaux/ecureuil.jpg", alt: "Photo d'un écureuil" },
  { word: "le hérisson", src: "/nomenclature/animaux/herisson.jpg", alt: "Photo d'un hérisson" },
  { word: "la grenouille", src: "/nomenclature/animaux/grenouille.jpg", alt: "Photo d'une grenouille" },
  { word: "le papillon", src: "/nomenclature/animaux/papillon.jpg", alt: "Photo d'un papillon" },
  { word: "le lapin", src: "/nomenclature/animaux/lapin.jpg", alt: "Photo d'un lapin" },
  { word: "le cerf", src: "/nomenclature/animaux/cerf.jpg", alt: "Photo d'un cerf" },
  { word: "le blaireau", src: "/nomenclature/animaux/blaireau.jpg", alt: "Photo d'un blaireau" },
  { word: "le sanglier", src: "/nomenclature/animaux/sanglier.jpg", alt: "Photo d'un sanglier" },
  { word: "l'oiseau", src: "/nomenclature/animaux/oiseau.jpg", alt: "Photo d'un oiseau" },
  { word: "la chouette", src: "/nomenclature/animaux/chouette.jpg", alt: "Photo d'une chouette" },
]

export const NOMENCLATURE_MOYEN_AGE: readonly NomenclaturePhoto[] = [
  { word: "le château", src: "/nomenclature/moyen-age/chateau.jpg", alt: "Photo d'un château" },
  { word: "le chevalier", src: "/nomenclature/moyen-age/chevalier.jpg", alt: "Photo d'une armure de chevalier" },
  { word: "le dragon", src: "/nomenclature/moyen-age/dragon.jpg", alt: "Photo d'une statue de dragon" },
  { word: "la couronne", src: "/nomenclature/moyen-age/couronne.jpg", alt: "Photo d'une couronne" },
  { word: "le blason", src: "/nomenclature/moyen-age/blason.jpg", alt: "Photo d'un blason / bouclier héraldique" },
  { word: "l'épée", src: "/nomenclature/moyen-age/epee.jpg", alt: "Photo d'une épée" },
  { word: "le bouclier", src: "/nomenclature/moyen-age/bouclier.jpg", alt: "Photo d'un bouclier" },
  { word: "le casque", src: "/nomenclature/moyen-age/casque.jpg", alt: "Photo d'un casque de chevalier" },
  { word: "la tour", src: "/nomenclature/moyen-age/tour.jpg", alt: "Photo d'une tour de château" },
  { word: "le cheval", src: "/nomenclature/moyen-age/cheval.jpg", alt: "Photo d'un cheval" },
  { word: "le trône", src: "/nomenclature/moyen-age/trone.jpg", alt: "Photo d'un trône" },
  { word: "le pont-levis", src: "/nomenclature/moyen-age/pont-levis.jpg", alt: "Photo d'un pont-levis" },
]

export const NOMENCLATURE_TOURNESOL: readonly NomenclaturePhoto[] = [
  { word: "le tournesol", src: "/nomenclature/tournesol/tournesol.jpg", alt: "Photo d'un tournesol" },
  { word: "la graine", src: "/nomenclature/tournesol/graine.jpg", alt: "Photo de graines de tournesol" },
  { word: "la feuille", src: "/nomenclature/tournesol/feuille.jpg", alt: "Photo d'une feuille de tournesol" },
  { word: "la tige", src: "/nomenclature/tournesol/tige.jpg", alt: "Photo de tiges de tournesol" },
  { word: "le soleil", src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
  { word: "l'abeille", src: "/nomenclature/tournesol/abeille.jpg", alt: "Photo d'une abeille" },
  { word: "le pétale", src: "/nomenclature/tournesol/petale.jpg", alt: "Photo de pétales de tournesol" },
  { word: "le pollen", src: "/nomenclature/tournesol/pollen.jpg", alt: "Photo de pollen" },
  { word: "la racine", src: "/nomenclature/tournesol/racine.jpg", alt: "Photo de racines" },
  { word: "le bourdon", src: "/nomenclature/tournesol/bourdon.jpg", alt: "Photo d'un bourdon" },
  { word: "le champ", src: "/nomenclature/tournesol/champ.jpg", alt: "Photo d'un champ de tournesols" },
  { word: "le germe", src: "/nomenclature/tournesol/germe.jpg", alt: "Photo d'une graine qui germe" },
]

export const NOMENCLATURE_ASIE: readonly NomenclaturePhoto[] = [
  { word: "le panda", src: "/nomenclature/asie/panda.jpg", alt: "Photo d'un panda" },
  { word: "le bambou", src: "/nomenclature/asie/bambou.jpg", alt: "Photo de bambou" },
  { word: "la fleur", src: "/nomenclature/asie/cerisier.jpg", alt: "Photo de fleurs de cerisier" },
  { word: "le riz", src: "/nomenclature/asie/riz.jpg", alt: "Photo d'un bol de riz" },
  { word: "la lanterne", src: "/nomenclature/asie/lanterne.jpg", alt: "Photo d'une lanterne" },
  { word: "la pagode", src: "/nomenclature/asie/pagode.jpg", alt: "Photo d'une pagode" },
  { word: "l'éléphant", src: "/nomenclature/asie/elephant.jpg", alt: "Photo d'un éléphant d'Asie" },
  { word: "la grue", src: "/nomenclature/asie/grue.jpg", alt: "Photo d'une grue" },
  { word: "la montagne", src: "/nomenclature/asie/montagne.jpg", alt: "Photo du mont Fuji" },
  { word: "le thé", src: "/nomenclature/asie/the.jpg", alt: "Photo d'une tasse de thé" },
  { word: "le temple", src: "/nomenclature/asie/temple.jpg", alt: "Photo d'un temple asiatique" },
  { word: "le lotus", src: "/nomenclature/asie/lotus.jpg", alt: "Photo d'une fleur de lotus" },
]

/** Variante Asie (packs plus âgés) — mêmes 12 photos, ordre / focus différents */
export const NOMENCLATURE_ASIE_PLUS: readonly NomenclaturePhoto[] = [
  { word: "le panda", src: "/nomenclature/asie/panda.jpg", alt: "Photo d'un panda" },
  { word: "l'éléphant", src: "/nomenclature/asie/elephant.jpg", alt: "Photo d'un éléphant d'Asie" },
  { word: "la grue", src: "/nomenclature/asie/grue.jpg", alt: "Photo d'une grue" },
  { word: "la pagode", src: "/nomenclature/asie/pagode.jpg", alt: "Photo d'une pagode" },
  { word: "la montagne", src: "/nomenclature/asie/montagne.jpg", alt: "Photo du mont Fuji" },
  { word: "le thé", src: "/nomenclature/asie/the.jpg", alt: "Photo d'une tasse de thé" },
  { word: "le bambou", src: "/nomenclature/asie/bambou.jpg", alt: "Photo de bambou" },
  { word: "la lanterne", src: "/nomenclature/asie/lanterne.jpg", alt: "Photo d'une lanterne" },
  { word: "le riz", src: "/nomenclature/asie/riz.jpg", alt: "Photo d'un bol de riz" },
  { word: "la fleur", src: "/nomenclature/asie/cerisier.jpg", alt: "Photo de fleurs de cerisier" },
  { word: "le temple", src: "/nomenclature/asie/temple.jpg", alt: "Photo d'un temple asiatique" },
  { word: "le lotus", src: "/nomenclature/asie/lotus.jpg", alt: "Photo d'une fleur de lotus" },
]

/** Objets / animaux réels — packs « animés » (pas de personnages de marque) */
export const NOMENCLATURE_PIRATE: readonly NomenclaturePhoto[] = [
  { word: "le bateau", src: "/nomenclature/pirate/bateau.jpg", alt: "Photo d'un bateau à voiles" },
  { word: "le chapeau", src: "/nomenclature/pirate/chapeau.jpg", alt: "Photo d'un chapeau de paille" },
  { word: "le trésor", src: "/nomenclature/pirate/tresor.jpg", alt: "Photo d'un coffre" },
  { word: "la boussole", src: "/nomenclature/pirate/boussole.jpg", alt: "Photo d'une boussole" },
  { word: "la mer", src: "/nomenclature/pirate/mer.jpg", alt: "Photo de la mer" },
  { word: "l'île", src: "/nomenclature/pirate/ile.jpg", alt: "Photo d'une île" },
  { word: "la carte", src: "/nomenclature/pirate/carte.jpg", alt: "Photo d'une carte ancienne" },
  { word: "l'ancre", src: "/nomenclature/pirate/ancre.jpg", alt: "Photo d'une ancre" },
  { word: "la voile", src: "/nomenclature/pirate/voile.jpg", alt: "Photo d'une voile de bateau" },
  { word: "le perroquet", src: "/nomenclature/pirate/perroquet.jpg", alt: "Photo d'un perroquet" },
  { word: "la vague", src: "/nomenclature/pirate/vague.jpg", alt: "Photo d'une vague" },
  { word: "le phare", src: "/nomenclature/pirate/phare.jpg", alt: "Photo d'un phare" },
]

export const NOMENCLATURE_SECOURS: readonly NomenclaturePhoto[] = [
  { word: "le chiot", src: "/nomenclature/secours/chiot.jpg", alt: "Photo d'un chiot" },
  { word: "la tour", src: "/nomenclature/secours/tour.jpg", alt: "Photo d'une tour" },
  { word: "le badge", src: "/nomenclature/secours/badge.jpg", alt: "Photo d'un badge" },
  { word: "le camion", src: "/nomenclature/secours/camion.jpg", alt: "Photo d'un camion" },
  { word: "l'os", src: "/nomenclature/secours/os.jpg", alt: "Photo d'un os pour chien" },
  { word: "le casque", src: "/nomenclature/secours/casque.jpg", alt: "Photo d'un casque de secours" },
  { word: "l'échelle", src: "/nomenclature/secours/echelle.jpg", alt: "Photo d'une échelle" },
  { word: "la sirène", src: "/nomenclature/secours/sirene.jpg", alt: "Photo d'une sirène de véhicule" },
  { word: "le collier", src: "/nomenclature/secours/collier.jpg", alt: "Photo d'un collier de chien" },
  { word: "la laisse", src: "/nomenclature/secours/laisse.jpg", alt: "Photo d'une laisse" },
  { word: "le feu", src: "/nomenclature/secours/feu.jpg", alt: "Photo d'un feu contrôlé / flamme" },
  { word: "l'eau", src: "/nomenclature/secours/eau.jpg", alt: "Photo d'eau qui coule" },
]

export const NOMENCLATURE_NUIT: readonly NomenclaturePhoto[] = [
  { word: "le chat", src: "/nomenclature/nuit/chat.jpg", alt: "Photo d'un chat" },
  { word: "le hibou", src: "/nomenclature/animaux/hibou.jpg", alt: "Photo d'un hibou" },
  { word: "le lézard", src: "/nomenclature/nuit/lezard.jpg", alt: "Photo d'un lézard" },
  { word: "la lune", src: "/nomenclature/nuit/lune.jpg", alt: "Photo de la lune" },
  { word: "le QG", src: "/nomenclature/nuit/qg.jpg", alt: "Photo d'un bâtiment la nuit" },
  { word: "l'étoile", src: "/nomenclature/nuit/etoile.jpg", alt: "Photo d'étoiles dans le ciel" },
  { word: "la chauve-souris", src: "/nomenclature/nuit/chauve-souris.jpg", alt: "Photo d'une chauve-souris" },
  { word: "le renard", src: "/nomenclature/animaux/renard.jpg", alt: "Photo d'un renard" },
  { word: "la nuit", src: "/nomenclature/nuit/nuit.jpg", alt: "Photo d'un ciel nocturne" },
  { word: "le toit", src: "/nomenclature/nuit/toit.jpg", alt: "Photo de toits la nuit" },
  { word: "la lanterne", src: "/nomenclature/nuit/lanterne.jpg", alt: "Photo d'une lanterne" },
  { word: "le masque", src: "/nomenclature/nuit/masque.jpg", alt: "Photo d'un masque" },
]

export const NOMENCLATURE_CHATS: readonly NomenclaturePhoto[] = [
  { word: "la maison", src: "/nomenclature/chats/maison.jpg", alt: "Photo d'une maison" },
  { word: "le chaton", src: "/nomenclature/chats/chaton.jpg", alt: "Photo d'un chaton" },
  { word: "le cupcake", src: "/nomenclature/chats/cupcake.jpg", alt: "Photo d'un cupcake" },
  { word: "la pelote", src: "/nomenclature/chats/pelote.jpg", alt: "Photo d'une pelote de laine" },
  { word: "la clé", src: "/nomenclature/chats/cle.jpg", alt: "Photo d'une clé" },
  { word: "le chat", src: "/nomenclature/nuit/chat.jpg", alt: "Photo d'un chat" },
  { word: "le coussin", src: "/nomenclature/chats/coussin.jpg", alt: "Photo d'un coussin" },
  { word: "le lait", src: "/nomenclature/chats/lait.jpg", alt: "Photo d'un bol de lait" },
  { word: "la souris", src: "/nomenclature/chats/souris.jpg", alt: "Photo d'une souris" },
  { word: "le panier", src: "/nomenclature/chats/panier.jpg", alt: "Photo d'un panier" },
  { word: "la fenêtre", src: "/nomenclature/chats/fenetre.jpg", alt: "Photo d'une fenêtre" },
  { word: "le soleil", src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
]

export const NOMENCLATURE_PAPILLON: readonly NomenclaturePhoto[] = [
  { word: "le papillon", src: "/nomenclature/papillon/papillon.jpg", alt: "Photo d'un papillon" },
  { word: "la chenille", src: "/nomenclature/papillon/chenille.jpg", alt: "Photo d'une chenille" },
  { word: "la chrysalide", src: "/nomenclature/papillon/chrysalide.jpg", alt: "Photo d'une chrysalide" },
  { word: "la fleur", src: "/nomenclature/papillon/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "l'aile", src: "/nomenclature/papillon/aile.jpg", alt: "Photo d'une aile de papillon" },
  { word: "l'œuf", src: "/nomenclature/papillon/oeuf.jpg", alt: "Photo d'œufs de papillon" },
  { word: "l'antenne", src: "/nomenclature/papillon/antenne.jpg", alt: "Photo d'antennes de papillon" },
  { word: "la feuille", src: "/nomenclature/papillon/feuille.jpg", alt: "Photo d'une feuille" },
  { word: "le nectar", src: "/nomenclature/papillon/nectar.jpg", alt: "Photo d'un papillon butinant" },
  { word: "le pollen", src: "/nomenclature/papillon/pollen.jpg", alt: "Photo de pollen sur une fleur" },
  { word: "la prairie", src: "/nomenclature/papillon/prairie.jpg", alt: "Photo d'une prairie fleurie" },
  { word: "le soleil", src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
]

export const NOMENCLATURE_SERPENT: readonly NomenclaturePhoto[] = [
  { word: "le serpent", src: "/nomenclature/serpent/serpent.jpg", alt: "Photo d'un serpent" },
  { word: "l'écaille", src: "/nomenclature/serpent/ecaille.jpg", alt: "Photo d'écailles de serpent" },
  { word: "la langue", src: "/nomenclature/serpent/langue.jpg", alt: "Photo d'une langue de serpent" },
  { word: "l'œuf", src: "/nomenclature/serpent/oeuf.jpg", alt: "Photo d'œufs de serpent" },
  { word: "le désert", src: "/nomenclature/serpent/desert.jpg", alt: "Photo d'un désert" },
  { word: "la forêt", src: "/nomenclature/serpent/foret.jpg", alt: "Photo d'une forêt" },
  { word: "la mue", src: "/nomenclature/serpent/mue.jpg", alt: "Photo d'une peau de serpent mue" },
  { word: "la tête", src: "/nomenclature/serpent/tete.jpg", alt: "Photo de la tête d'un serpent" },
  { word: "l'œil", src: "/nomenclature/serpent/oeil.jpg", alt: "Photo de l'œil d'un serpent" },
  { word: "le nid", src: "/nomenclature/serpent/nid.jpg", alt: "Photo d'un nid / ponte de serpent" },
  { word: "le sable", src: "/nomenclature/serpent/sable.jpg", alt: "Photo de sable" },
  { word: "le rocher", src: "/nomenclature/serpent/rocher.jpg", alt: "Photo d'un rocher" },
]

/** Nature & saisons — photos réutilisées de sets existants (Commons) */
export const NOMENCLATURE_SAISONS: readonly NomenclaturePhoto[] = [
  { word: "le soleil", src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
  { word: "la feuille", src: "/nomenclature/tournesol/feuille.jpg", alt: "Photo d'une feuille" },
  { word: "la fleur", src: "/nomenclature/papillon/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "le papillon", src: "/nomenclature/animaux/papillon.jpg", alt: "Photo d'un papillon" },
  { word: "la mer", src: "/nomenclature/pirate/mer.jpg", alt: "Photo de la mer" },
  { word: "la lune", src: "/nomenclature/nuit/lune.jpg", alt: "Photo de la lune" },
  { word: "la neige", src: "/nomenclature/saisons/neige.jpg", alt: "Photo de neige" },
  { word: "la pluie", src: "/nomenclature/saisons/pluie.jpg", alt: "Photo de pluie" },
  { word: "le nuage", src: "/nomenclature/saisons/nuage.jpg", alt: "Photo d'un nuage" },
  { word: "l'arbre", src: "/nomenclature/saisons/arbre.jpg", alt: "Photo d'un arbre" },
  { word: "la pomme", src: "/nomenclature/saisons/pomme.jpg", alt: "Photo d'une pomme" },
  { word: "le gland", src: "/nomenclature/saisons/gland.jpg", alt: "Photo d'un gland" },
]

export const NOMENCLATURE_COCCINELLE: readonly NomenclaturePhoto[] = [
  { word: "la coccinelle", src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle" },
  { word: "la feuille", src: "/nomenclature/coccinelle/feuille.jpg", alt: "Photo d'une feuille" },
  { word: "la fleur", src: "/nomenclature/coccinelle/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "l'œuf", src: "/nomenclature/coccinelle/oeuf.jpg", alt: "Photo d'œufs de coccinelle" },
  { word: "le soleil", src: "/nomenclature/coccinelle/soleil.jpg", alt: "Photo du soleil" },
  { word: "l'abeille", src: "/nomenclature/coccinelle/abeille.jpg", alt: "Photo d'une abeille" },
  { word: "la larve", src: "/nomenclature/coccinelle/larve.jpg", alt: "Photo d'une larve de coccinelle" },
  { word: "le puceron", src: "/nomenclature/coccinelle/puceron.jpg", alt: "Photo d'un puceron" },
  { word: "le jardin", src: "/nomenclature/coccinelle/jardin.jpg", alt: "Photo d'un jardin" },
  { word: "l'herbe", src: "/nomenclature/coccinelle/herbe.jpg", alt: "Photo d'herbe" },
  { word: "la nymphe", src: "/nomenclature/coccinelle/nymphe.jpg", alt: "Photo d'une nymphe de coccinelle" },
  { word: "l'antenne", src: "/nomenclature/coccinelle/antenne.jpg", alt: "Photo d'antennes d'insecte" },
]

export const NOMENCLATURE_CERISE: readonly NomenclaturePhoto[] = [
  { word: "la cerise", src: "/nomenclature/cerise/cerise.jpg", alt: "Photo de cerises" },
  { word: "la fleur", src: "/nomenclature/cerise/fleur.jpg", alt: "Photo de fleurs de cerisier" },
  { word: "l'arbre", src: "/nomenclature/cerise/arbre.jpg", alt: "Photo d'un cerisier" },
  { word: "le panier", src: "/nomenclature/cerise/panier.jpg", alt: "Photo d'un panier de fruits" },
  { word: "la feuille", src: "/nomenclature/cerise/feuille.jpg", alt: "Photo d'une feuille de cerisier" },
  { word: "le noyau", src: "/nomenclature/cerise/noyau.jpg", alt: "Photo d'un noyau de cerise" },
  { word: "la branche", src: "/nomenclature/cerise/branche.jpg", alt: "Photo d'une branche de cerisier" },
  { word: "le pétale", src: "/nomenclature/cerise/petale.jpg", alt: "Photo de pétales" },
  { word: "le soleil", src: "/nomenclature/cerise/soleil.jpg", alt: "Photo du soleil" },
  { word: "l'oiseau", src: "/nomenclature/cerise/oiseau.jpg", alt: "Photo d'un oiseau" },
  { word: "le verger", src: "/nomenclature/cerise/verger.jpg", alt: "Photo d'un verger" },
  { word: "la tige", src: "/nomenclature/cerise/tige.jpg", alt: "Photo d'une tige de cerise" },
]

export const NOMENCLATURE_ANTARCTIQUE: readonly NomenclaturePhoto[] = [
  { word: "le pingouin", src: "/nomenclature/antarctique/pingouin.jpg", alt: "Photo d'un pingouin" },
  { word: "le phoque", src: "/nomenclature/antarctique/phoque.jpg", alt: "Photo d'un phoque" },
  { word: "la baleine", src: "/nomenclature/antarctique/baleine.jpg", alt: "Photo d'une baleine" },
  { word: "l'igloo", src: "/nomenclature/antarctique/igloo.jpg", alt: "Photo d'un igloo" },
  { word: "la glace", src: "/nomenclature/antarctique/glace.jpg", alt: "Photo de glace / iceberg" },
  { word: "le flocon", src: "/nomenclature/antarctique/flocon.jpg", alt: "Photo d'un flocon de neige" },
  { word: "la banquise", src: "/nomenclature/antarctique/banquise.jpg", alt: "Photo de la banquise" },
  { word: "l'eau", src: "/nomenclature/antarctique/eau.jpg", alt: "Photo de l'océan austral" },
  { word: "le rocher", src: "/nomenclature/antarctique/rocher.jpg", alt: "Photo d'un rocher" },
  { word: "la neige", src: "/nomenclature/antarctique/neige.jpg", alt: "Photo de neige" },
  { word: "le ciel", src: "/nomenclature/antarctique/ciel.jpg", alt: "Photo du ciel polaire" },
  { word: "le krill", src: "/nomenclature/antarctique/krill.jpg", alt: "Photo de krill" },
]

export const NOMENCLATURE_AFRIQUE: readonly NomenclaturePhoto[] = [
  { word: "le lion", src: "/nomenclature/afrique/lion.jpg", alt: "Photo d'un lion" },
  { word: "l'éléphant", src: "/nomenclature/afrique/elephant.jpg", alt: "Photo d'un éléphant d'Afrique" },
  { word: "la girafe", src: "/nomenclature/afrique/girafe.jpg", alt: "Photo d'une girafe" },
  { word: "l'acacia", src: "/nomenclature/afrique/acacia.jpg", alt: "Photo d'un acacia" },
  { word: "le baobab", src: "/nomenclature/afrique/baobab.jpg", alt: "Photo d'un baobab" },
  { word: "la savane", src: "/nomenclature/afrique/savane.jpg", alt: "Photo de la savane" },
  { word: "le zèbre", src: "/nomenclature/afrique/zebre.jpg", alt: "Photo d'un zèbre" },
  { word: "l'hippopotame", src: "/nomenclature/afrique/hippopotame.jpg", alt: "Photo d'un hippopotame" },
  { word: "le soleil", src: "/nomenclature/afrique/soleil.jpg", alt: "Photo d'un soleil africain" },
  { word: "l'herbe", src: "/nomenclature/afrique/herbe.jpg", alt: "Photo d'herbe de savane" },
  { word: "le rhinocéros", src: "/nomenclature/afrique/rhinoceros.jpg", alt: "Photo d'un rhinocéros" },
  { word: "l'autruche", src: "/nomenclature/afrique/autruche.jpg", alt: "Photo d'une autruche" },
]

export const NOMENCLATURE_OCEAN: readonly NomenclaturePhoto[] = [
  { word: "le poisson", src: "/nomenclature/ocean/poisson.jpg", alt: "Photo d'un poisson" },
  { word: "la baleine", src: "/nomenclature/ocean/baleine.jpg", alt: "Photo d'une baleine" },
  { word: "le coquillage", src: "/nomenclature/ocean/coquillage.jpg", alt: "Photo d'un coquillage" },
  { word: "la vague", src: "/nomenclature/ocean/vague.jpg", alt: "Photo d'une vague" },
  { word: "la pieuvre", src: "/nomenclature/ocean/pieuvre.jpg", alt: "Photo d'une pieuvre" },
  { word: "le bateau", src: "/nomenclature/ocean/bateau.jpg", alt: "Photo d'un bateau" },
  { word: "la mer", src: "/nomenclature/ocean/mer.jpg", alt: "Photo de la mer" },
  { word: "le corail", src: "/nomenclature/ocean/corail.jpg", alt: "Photo de corail" },
  { word: "l'étoile de mer", src: "/nomenclature/ocean/etoile-de-mer.jpg", alt: "Photo d'une étoile de mer" },
  { word: "le crabe", src: "/nomenclature/ocean/crabe.jpg", alt: "Photo d'un crabe" },
  { word: "l'algue", src: "/nomenclature/ocean/algue.jpg", alt: "Photo d'algues" },
  { word: "le dauphin", src: "/nomenclature/ocean/dauphin.jpg", alt: "Photo d'un dauphin" },
]

export const NOMENCLATURE_HALLOWEEN: readonly NomenclaturePhoto[] = [
  { word: "la citrouille", src: "/nomenclature/halloween/citrouille.jpg", alt: "Photo d'une citrouille" },
  { word: "la chauve-souris", src: "/nomenclature/halloween/chauve-souris.jpg", alt: "Photo d'une chauve-souris" },
  { word: "le fantôme", src: "/nomenclature/halloween/fantome.jpg", alt: "Photo d'un déguisement fantôme" },
  { word: "le bonbon", src: "/nomenclature/halloween/bonbon.jpg", alt: "Photo de bonbons" },
  { word: "la lune", src: "/nomenclature/halloween/lune.jpg", alt: "Photo de la lune" },
  { word: "l'araignée", src: "/nomenclature/halloween/araignee.jpg", alt: "Photo d'une araignée" },
  { word: "le chat", src: "/nomenclature/halloween/chat.jpg", alt: "Photo d'un chat noir" },
  { word: "la feuille", src: "/nomenclature/halloween/feuille.jpg", alt: "Photo d'une feuille d'automne" },
  { word: "la bougie", src: "/nomenclature/halloween/bougie.jpg", alt: "Photo d'une bougie" },
  { word: "le chapeau", src: "/nomenclature/halloween/chapeau.jpg", alt: "Photo d'un chapeau pointu" },
  { word: "le maïs", src: "/nomenclature/halloween/mais.jpg", alt: "Photo de maïs" },
  { word: "la lanterne", src: "/nomenclature/halloween/lanterne.jpg", alt: "Photo d'une lanterne citrouille" },
]

export const NOMENCLATURE_NOEL: readonly NomenclaturePhoto[] = [
  { word: "le sapin", src: "/nomenclature/noel/sapin.jpg", alt: "Photo d'un sapin de Noël" },
  { word: "l'étoile", src: "/nomenclature/noel/etoile.jpg", alt: "Photo d'une étoile de Noël" },
  { word: "le cadeau", src: "/nomenclature/noel/cadeau.jpg", alt: "Photo d'un cadeau" },
  { word: "la moufle", src: "/nomenclature/noel/moufle.jpg", alt: "Photo de moufles" },
  { word: "le chocolat", src: "/nomenclature/noel/chocolat.jpg", alt: "Photo de chocolat chaud" },
  { word: "le renne", src: "/nomenclature/noel/renne.jpg", alt: "Photo d'un renne" },
  { word: "la neige", src: "/nomenclature/noel/neige.jpg", alt: "Photo de neige" },
  { word: "la boule", src: "/nomenclature/noel/boule.jpg", alt: "Photo d'une boule de Noël" },
  { word: "la guirlande", src: "/nomenclature/noel/guirlande.jpg", alt: "Photo d'une guirlande lumineuse" },
  { word: "la cloche", src: "/nomenclature/noel/cloche.jpg", alt: "Photo d'une cloche" },
  { word: "la botte", src: "/nomenclature/noel/botte.jpg", alt: "Photo d'une botte / chaussette de Noël" },
  { word: "la bûche", src: "/nomenclature/noel/buche.jpg", alt: "Photo d'une bûche" },
]

export const NOMENCLATURE_ABEILLES: readonly NomenclaturePhoto[] = [
  { word: "l'abeille", src: "/nomenclature/abeilles/abeille.jpg", alt: "Photo d'une abeille" },
  { word: "la ruche", src: "/nomenclature/abeilles/ruche.jpg", alt: "Photo d'une ruche" },
  { word: "le miel", src: "/nomenclature/abeilles/miel.jpg", alt: "Photo de miel" },
  { word: "la fleur", src: "/nomenclature/abeilles/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "le pollen", src: "/nomenclature/abeilles/pollen.jpg", alt: "Photo de pollen" },
  { word: "le nectar", src: "/nomenclature/abeilles/nectar.jpg", alt: "Photo de nectar dans une fleur" },
  { word: "le couvain", src: "/nomenclature/abeilles/couvain.jpg", alt: "Photo de couvain d'abeilles" },
  { word: "la reine", src: "/nomenclature/abeilles/reine.jpg", alt: "Photo d'une abeille reine" },
  { word: "l'ouvrière", src: "/nomenclature/abeilles/ouvriere.jpg", alt: "Photo d'une abeille ouvrière" },
  { word: "la cire", src: "/nomenclature/abeilles/cire.jpg", alt: "Photo de cire d'abeille" },
  { word: "le bourdon", src: "/nomenclature/abeilles/bourdon.jpg", alt: "Photo d'un bourdon" },
  { word: "l'essaim", src: "/nomenclature/abeilles/essaim.jpg", alt: "Photo d'un essaim d'abeilles" },
]
