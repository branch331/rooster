import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
describe('WeatherService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(WeatherService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=weather.service.spec.js.map