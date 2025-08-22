import HomeScreen from '@/app/(tabs)';
import FullVideoPlayer from '@/app/player/[videoId]';
import { VIDEO_LIST_ITEM_TEST_ID } from '@/components/VideoListItem/VideoListItem';
import { playButtonTitle } from '@/components/VideoItemDetailsPanel/VideoItemDetailsPanel';
import { renderRouter, screen, fireEvent } from 'expo-router/testing-library';

//TODO: Add test infrastructure - 
// mocks for expo modules (expo-video),
// fix router test imports
describe.skip("integration test navigating the main screens/ features", () => {
    it("dummy case", () => {
        expect(1).toBe(1);
    })
    // it.skip("should navigate and render from home to videoId via details panel", async () => {
    //     renderRouter(
    //         {
    //             home: jest.fn(() => <HomeScreen />),
    //             "player/[videoId]": jest.fn(() => <FullVideoPlayer />),
    //         },
    //         {
    //             initialUrl: "/home",
    //         }
    //     );

    //     const catalogItem = screen.getAllByTestId(VIDEO_LIST_ITEM_TEST_ID.pressable)[0];

    //     fireEvent(catalogItem, "press");

    //     const watchButton = screen.findByText(playButtonTitle);
    //     expect(watchButton).toBeOnTheScreen();

    //     fireEvent(watchButton, "press");

    //     //TODO: fix test library imports for expo-router
    //     // expect(screen).toHaveRouterState({
    //     //     routes: [{ name: 'player', path: '/[videoId]' }],
    //     //   });
    // });
})