import {HMatcher, LabelPat, PatternDefinition, lazyFlatMap} from "./pattern";
import RoutePatternDefinition = HMatcher.RoutePatternDefinition;

const FLAG_MAP = {
    fo: 'firstOnly',
    refx: 'reflexive',
};


export function loadPattern(patternString: string): RoutePatternDefinition {
    return null;
}

export function serializePattern(pattern: RoutePatternDefinition): string {
    const {firstOnly, reflexive, definitions} = pattern;

    const serializedDefinitions = lazyFlatMap(definitions, _serializeDefinition);

    const flags = [_resolveFlag('firstOnly', firstOnly), _resolveFlag('reflexive', reflexive)].filter(_ => _).join('-');
    return `${flags}|${Array.from(serializedDefinitions).join('|')}`;
}

function* _serializeDefinition(def: PatternDefinition) {
        const {
            labelPred,
            vertex,
            index,
            through,
            resolve,
            modifier,
            excluding,
            vertexLabelPat,
        } = def;

        yield `<`;


        const arrow = through === "outgoing" ? "->" : "<-";
        const arrowModifier = modifier === "rtc" ? "*" : "";
        yield `${arrow}${arrowModifier}`;

        const specialModifiers = Object.fromEntries(Object.entries({
            resolve,
            excluding,
            vertexLabelPat,
        }).filter(([k ,v]) => v));

        yield JSON.stringify(specialModifiers);

        yield `>`;
}

function _resolveFlag(name: string, value?: boolean): string {
    return value && Object.entries(FLAG_MAP).filter(([k, v]) => v === name).map(([k, v]) => v)[0];
}
