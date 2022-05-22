import HabitPresenter from '../habit_presenter';

describe('habit', () => {
  let presenter;
  let update;
  let maxHabits = 3;
  const habits = [
    { id: 1, name: 'Reading', count: 1 },
    { id: 2, name: 'Running', count: 0 },
  ];

  beforeEach(() => {
    presenter = new HabitPresenter(habits, maxHabits);
    update = jest.fn();
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('increments habit count and call update callback', () => {
    presenter.increment(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it('decrements habit count and call update callback', () => {
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('does not set the count value below 0 when decrements and call update callback', () => {
    presenter.decrement(habits[1], update);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled();
  });


  it('delete habit from the list and call update callback', () => {
    presenter.delete(habits[0], update);
    
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('Running');
    checkUpdateIsCalled();
  });


  it('add new habit to the list and call update callback', () => {
    presenter.add('Coding', update);
    expect(presenter.getHabits()[2].name).toBe('Coding');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('throws an error when the max habits limit is exceeded', () => {
    presenter.add('Coding', update);
    expect(() => {
      presenter.add('Coding', update);
    }).toThrow('습관의 갯수는 3 이상이 될 수 없습니다.')
  });

  it('reset all habit counts to 0 and call update callback', () => {
    presenter.reset(update);
    expect(presenter.getHabits()[0].count).toBe(0);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled();
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toBeCalledWith(presenter.getHabits());
  }
})