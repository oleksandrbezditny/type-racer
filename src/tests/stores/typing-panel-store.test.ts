// @ts-ignore
import { TypingPanelStore } from 'stores';
import { defaultTextOptions, ITextProvider, TextOptions } from 'connections';
import { Text } from 'connections';

class FakeTextProvider implements ITextProvider {
    getTexts(options: TextOptions = defaultTextOptions): Promise<Text> {
        return new Promise<Text>((resolve) => {
            resolve(['fake test', 'fake test2']);
        });
    }
}

describe('TypingPanelStore', () => {
    let typingPanelStore: TypingPanelStore;
    beforeEach(() => {
        typingPanelStore = new TypingPanelStore(new FakeTextProvider(), 3);
    });

    it('Should have text', () => {
        expect(typingPanelStore.text).toBe('fake test fake test2');
    });

    it('Should change position when correct letter was pressed', () => {
        typingPanelStore.applyLetter('f');

        expect(typingPanelStore.currentPosition).toBe(1);
        expect(typingPanelStore.lastCorrectPosition).toBe(1);
    });

    it('Shouldn/t change last correct position when incorrect letter was pressed', () => {
        typingPanelStore.applyLetter('a');

        expect(typingPanelStore.currentPosition).toBe(1);
        expect(typingPanelStore.lastCorrectPosition).toBe(0);
    });

    it('Should change position when goBack was called', () => {
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('f');
        typingPanelStore.goBack();

        expect(typingPanelStore.currentPosition).toBe(2);
        expect(typingPanelStore.lastCorrectPosition).toBe(2);
    });

    it('Should change position when goBack was called (2)', () => {
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('f');
        typingPanelStore.goBack();

        expect(typingPanelStore.currentPosition).toBe(3);
        expect(typingPanelStore.lastCorrectPosition).toBe(2);
    });

    it('Should change position when goBack was called (3)', () => {
        typingPanelStore.goBack();

        expect(typingPanelStore.currentPosition).toBe(0);
        expect(typingPanelStore.lastCorrectPosition).toBe(0);
    });

    it('Should have correct complete percentage when correct letters were pressed', () => {
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('k');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter(' ');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter('s');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter(' ');

        expect(typingPanelStore.completionPercent).toBe(50);
    });

    it('Should have correct complete percentage when incorrect letter was pressed', () => {
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('k');
        typingPanelStore.applyLetter('k');

        expect(typingPanelStore.completionPercent).toBe(15);
    });

    it('Should finish the game when all text was typed correctly', () => {
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('k');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter(' ');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter('s');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter(' ');
        typingPanelStore.applyLetter('f');
        typingPanelStore.applyLetter('a');
        typingPanelStore.applyLetter('k');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter(' ');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter('e');
        typingPanelStore.applyLetter('s');
        typingPanelStore.applyLetter('t');
        typingPanelStore.applyLetter('2');

        expect(typingPanelStore.isInProgress).toBe(false);
        expect(typingPanelStore.completionPercent).toBe(100);
    });
});

